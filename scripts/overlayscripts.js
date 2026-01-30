const Pokedex_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

let pokemon = [];
let currentPokemonIndex = 0;
currentPokemonData = 0;
let currentTab = "main";


function loadAndShowPokemon() {
    loadPokemon();
}


async function loadPokemon() {
    let response = await fetch(Pokedex_URL)
    responseToJson = await response.json();
    pokemon = responseToJson.results;

    await showPokemon();
}


async function getPokemonDetails(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();
    return data;
}


async function getPokemonTypes(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();

    let types = [];
    for (let i = 0; i < data.types.length; i++){
        types[i] = data.types[i].type.name;
    } return types;
}

async function getPokemonMainInfo(id) {
     let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();

    console.log(data)
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
        typesHTML += `<span class="pokemon-type ${types[i]}">${types[i]}</span>`;

       
    }
    return `<main class="main-card">  
                <section class="card-inside" onclick="openPokemonCard(${id})" >
                    <div class="card" style="width: 18rem;">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" class="card-img-top" alt="Pokemon-Image">
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

async function openPokemonCard(id) {
    currentPokemonData = await getPokemonDetails(id);

    let height = currentPokemonData.height;
    let weight = currentPokemonData.weight;
    let baseExperience = currentPokemonData.base_experience;
    let abilities = currentPokemonData.abilities;

    let abilitiesHTML ="";
    for (let index = 0; index < abilities.length; index++) {
        const ability = abilities[index].ability.name;
        abilitiesHTML += `<span>${ability} </span>`
    }
  
    for (let i = 0; i < pokemon.length; i++) {
        if (getIdFromURL(pokemon[i]) == id) {
        currentPokemonIndex = i;
        break;
        }    
    }
    
    let selectedPokemon = pokemon[currentPokemonIndex];
    let types = await getPokemonTypes(id);

    let overlay = document.getElementById('overlay');
    let overlayCard = document.getElementById('overlay-card');

    overlay.classList.remove('d_none');
    overlayCard.innerHTML = getOverlayCard(id, selectedPokemon.name, types, height, weight, baseExperience, abilitiesHTML);
}


