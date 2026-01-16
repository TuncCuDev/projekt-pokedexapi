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
    getIdFromURL();
}


function showPokemon() {
    let pokemonContent = document.getElementById("content");
    pokemonContent.innerHTML = "";

    for (let i = 0; i < pokemon.length; i++) {
        let singlePokemon = pokemon[i];
        let id = getIdFromURL(singlePokemon);

    pokemonContent.innerHTML += getPokemonTemplates(singlePokemon, id);
    }
}


function getIdFromURL(singlePokemon) {
    let url = singlePokemon.url
    let seperateURL = url.split("/");
    let id = seperateURL[seperateURL.length-2]
    console.log(id);
    return id;
}


function getPokemonTemplates(singlePokemon, id) {
    return `<main class=""main-card>  
                <section class="card-inside">
                    <div class="card" style="width: 18rem;">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" class="card-img-top" alt="...">
                        <div class="card-body">
                        <p class="card-id"></p>
                        <span>${id} </span>
                        <h5 class="card-title">${singlePokemon.name}</h5>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </section>
            </main>`
}