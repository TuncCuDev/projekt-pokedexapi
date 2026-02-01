let limit= 20;
let offset = 0;
let pokemon = [];
let currentPokemonIndex = 0;
let currentPokemonData = null;
let currentPokemonId = null;
let selectedPokemon = null;


async function loadAndShowPokemon() {
    showLoadingSpinner();
    loadPokemon();  
    setTimeout(() => {
       disabledLoadingSpinner();
    }, 2000);
}


async function loadMorePokemon() {
    showLoadingSpinner();   
    setTimeout(() => {
         loadPokemon();  
    }, 2000)   
    setTimeout(() => {
        disabledLoadingSpinner();   
    }, 2000); 
}


async function loadPokemon() {
    let URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`

    let response = await fetch(URL)
    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        pokemon.push(data.results[i]);
    }
    showPokemon();
    offset += limit;
}


function searchForPokemon() {
    let list = document.getElementById('search-pokemon').value;
    let pokemonList = pokemon.filter(p=>p.name.includes(list));
    
    if (pokemonList.length > 0) {
    showPokemon(pokemonList);
    } else {
    document.getElementById("content").innerHTML = "<p>There is no Pokemon with this name.</p>";
    }

    document.getElementById('search-pokemon').value = "";
}


function showLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.remove('d_none');
    document.getElementById('overlay-spinner').classList.remove('d_none');
}


function disabledLoadingSpinner() {
    document.getElementById('loadingSpinner').classList.add('d_none');
    document.getElementById('overlay-spinner').classList.add('d_none');
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


async function showPokemon(pokemonList = pokemon) {
    let pokemonContent = document.getElementById("content");
    pokemonContent.innerHTML = "";

    for (let i = 0; i < pokemonList.length; i++) {
        let singlePokemon = pokemonList[i];
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


function buildAbilitiesHTML(abilities) {
    let html ="";
    for (let i = 0; i < abilities.length; i++) {
        html += abilities[i].ability.name;
    
        if(i < abilities.length - 1){
            html += ", ";
        }
    }
    return html;
}


function getPokemonTemplates(singlePokemon, id, types) {
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        typesHTML += `<span class="pokemon-type ${types[i]}">${types[i]}</span>`;
    }
    return showPokemonCard(singlePokemon, id, typesHTML);
}


async function openPokemonCard(id) {
    currentPokemonData = await getPokemonDetails(id);
    currentPokemonId = id;

    findCurrentPokemonIndex(id);
    selectedPokemon = pokemon[currentPokemonIndex];

    let height = currentPokemonData.height;
    let weight = currentPokemonData.weight;
    let baseExperience = currentPokemonData.base_experience;
    
    let types = await getPokemonTypes(currentPokemonId);

    renderPokemonOverlayCard(id, selectedPokemon, currentPokemonData, types, height, weight, baseExperience)
}


function findCurrentPokemonIndex(id) {
        for (let i = 0; i < pokemon.length; i++) {
            if (getIdFromURL(pokemon[i]) == id) {
            currentPokemonIndex = i;
            break;
            }    
        }
    }
