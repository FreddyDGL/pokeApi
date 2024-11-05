const listaPokemon = document.querySelector("#listaPokemon");
const botenHeader = document.querySelectorAll(".btn-header")

//consumo de PokeAPI 151 veces 
let URL = "https://pokeapi.co/api/v2/pokemon/";
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(data) {

    //mapeo de todas las categorias que tiene un pokemon 
    let tipos = data.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    //agrega uno o dos ceros para que se vea mas estetico
    let dataID = data.id.toString();
    if (dataID.length === 1) {
        dataID = "oo" + dataID;
    } else if (dataID.length === 2) {
        dataID = "0" + dataID;
    }

    //crea la plantilla de cada pokemon con su informacion personalizada 
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML =//en teclado en español `` se pone con "altGr" mas dos veces la tecla }"
        `
                    <p class="pokemon-id-back"> #${dataID}</p>
                    <div class="pokemon-image">
                        <img src="${data.sprites.other["official-artwork"].front_default}" alt="pikachu">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${dataID}</p>
                            <h2 class="pokemon-nombre">${data.name}</h2>
                        </div>
                        <div class="pokemon-tipo">
                            ${tipos}
                        </div>
                        <div class="pokemon-stats">
                            <p class="stats">${data.weight}KG</p>
                            <p class="stats">${data.height}m</p>
                        </div>
                    </div>`;
    listaPokemon.append(div);
}

//evento donde se realiza la clasificacion por categoria 
botenHeader.forEach(boton => boton.addEventListener('click', (e) => {
    //asigna a la constante el id delboton que se preciono
    const botonID = e.currentTarget.id;

    //limpia los pokemon ya cargados 
    listaPokemon.innerHTML = "";

    let URL = "https://pokeapi.co/api/v2/pokemon/";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonID === "ver-todos") {
                    mostrarPokemon(data)
                } else {
                    // muestra solo el tipo de pokemon que se presiono 
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonID))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}))