const Pokedex_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

let pokemon = [];


function loadAndShowPokemon() {
    loadPokemon();
}


async function loadPokemon() {
    let response = await fetch(Pokedex_URL)
    responseToJson = await response.json();
    pokemon = responseToJson.results;

    await showPokemon();
}

async function getPokemonTypes(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();

    let types = [];
    for (let i = 0; i < data.types.length; i++){

        types[i] = data.types[i].type.name;
    } return types;
}


async function showPokemon() {
    let pokemonContent = document.getElementById("content");
    pokemonContent.innerHTML = "";

    for (let i = 0; i < pokemon.length; i++) {
        let singlePokemon = pokemon[i];
        let id = getIdFromURL(singlePokemon);
        let types = await getPokemonTypes(id);


    pokemonContent.innerHTML += getPokemonTemplates(singlePokemon, id, types);
    }
}


function getIdFromURL(singlePokemon) {
    let url = singlePokemon.url
    let seperateURL = url.split("/");
    let id = seperateURL[seperateURL.length-2];
    return id;
}


function getPokemonTemplates(singlePokemon, id, types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        typesHTML += `<span class="pokemon-type"> ${types[i]}</span>`;
        
    }
    return `<main class=""main-card>  
                <section class="card-inside">
                    <div class="card" style="width: 18rem;">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="card-id">
                                <h4> #${id} </h4>
                                <h5 class="card-title">${singlePokemon.name}</h5>
                            </div>
                            <div class="pokemon-types">${typesHTML}</div>
                        </div>
                    </div>
                </section>
            </main>`
                
}