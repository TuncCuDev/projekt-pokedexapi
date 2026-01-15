const Pokedex_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

let pokemon = [];


function loadAndShowPokemon() {
    loadPokemon();
}


async function loadPokemon() {
    let response = await fetch(Pokedex_URL)
    responseToJson = await response.json();
    pokemon = responseToJson.results;

    showPokemon();
}


function showPokemon() {
    let pokemonContent = document.getElementById("content");
    pokemonContent.innerHTML = "";

    for (let i = 0; i < pokemon.length; i++) {
        let p = pokemon[i];

    pokemonContent.innerHTML += getPokemonTemplates(p);
    }
}


function getPokemonTemplates(p) {
    return `<section class="main-card">
                <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${p.name}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </section>`
}