let limit= 20;
let offset = 0;
let pokemon = [];
let currentPokemonIndex = 0;
let currentPokemonData = null;
let currentPokemonId = null;
let selectedPokemon = null;
let availablePokemonList = pokemon;
let pokemonData = {};


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
    availablePokemonList = pokemon;
    showPokemon();
    offset += limit;
}


function searchForPokemon() {
    let list = document.getElementById('search-pokemon').value;
    let pokemonList = pokemon.filter(p=>p.name.includes(list));
    
    if (pokemonList.length > 0) {
        availablePokemonList = pokemonList;
        showPokemon(pokemonList);
        document.getElementById('changeToBack').classList.add('d_none');
        document.getElementById('comeBack').classList.remove('d_none'); 
    } else {
    document.getElementById("content").innerHTML = "<p>There is no Pokemon with this name.</p>";
    document.getElementById('changeToBack').classList.add('d_none');
    document.getElementById('comeBack').classList.remove('d_none'); 
    }

    document.getElementById('search-pokemon').value = "";
}


function comeBackToMain() {
    showPokemon();
    document.getElementById('changeToBack').classList.remove('d_none');
    document.getElementById('comeBack').classList.add('d_none'); 
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
    return await loadPokemonDetails(id)
}


async function loadPokemonDetails(id) {
    if (pokemonData[id]) {
        return pokemonData[id];
    }

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    let data = await response.json();

    pokemonData[id] = data;
    
    return data;
}


async function getPokemonTypes(id) {
    let data = await loadPokemonDetails(id);

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
    selectedPokemon = availablePokemonList[currentPokemonIndex];

    let height = currentPokemonData.height;
    let weight = currentPokemonData.weight;
    let baseExperience = currentPokemonData.base_experience;
    
    let types = await getPokemonTypes(currentPokemonId);

    renderPokemonOverlayCard(id, selectedPokemon, currentPokemonData, types, height, weight, baseExperience)
}


function findCurrentPokemonIndex(id) {
        for (let i = 0; i < availablePokemonList.length; i++) {
            if (getIdFromURL(availablePokemonList[i]) == id) {
            currentPokemonIndex = i;
            break;
            }    
        }
    }
