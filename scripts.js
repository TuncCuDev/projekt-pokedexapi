let nextURL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
let pokemon = [];
let currentPokemonIndex = 0;
let currentPokemonData = null;


function loadAndShowPokemon() {
    loadPokemon();
}


async function loadPokemon() {
    if (!nextURL) return;

    let response = await fetch(nextURL)
    let data = await response.json();

    for (let i = 0; i < data.results.length; i++) {
        pokemon.push(data.results[i]);
    }
    
    nextURL = data.next

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
   

    let abilitiesHTML = buildAbilitiesHTML(currentPokemonData.abilities);
    
  
    for (let i = 0; i < pokemon.length; i++) {
        if (getIdFromURL(pokemon[i]) == id) {
        currentPokemonIndex = i;
        break;
        }    
    }
    
    let selectedPokemon = pokemon[currentPokemonIndex];
    let types = await getPokemonTypes(id);

    let overlayMain = document.getElementById('overlayMain')
    let overlay = document.getElementById('overlay');
    let overlayCard = document.getElementById('overlay-card');

    overlayMain.classList.remove('d_none');
    overlayCard.innerHTML = getOverlayCard(id, selectedPokemon.name, types, height, weight, baseExperience, abilitiesHTML);
}


function getOverlayCard(id, name, types, height, weight, baseExperience, abilitiesHTML) {
    let typesHTML = "";

    for (let i = 0; i < types.length; i++) {
        typesHTML += `<span class="pokemon-type overlay-pokemon-type ${types[i]}">${types[i]}</span>`;
    }

    return `<div class="main-overlay" onclick="event.stopPropagation()">
            <header>
                <div class="header-first-line">
                    <div id="overlayPokemonId">#${id}</div>
                    <div id="overlayPokemonName">${name}</div>
                    <button class="btn-close overlay-close-button" onclick="closePokemonCard()"></button>
                </div>
                <div class="header-second-line">
                    <img class="overlay-pokemon-image" id="overlayPokemonImage" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
                </div>
                <div class="overlay-pokemon-types" id="overlayPokemonTypes">
                    ${typesHTML}
                </div>
            </header>
            <main>
                    <a class="nav-link active overlay-link">Main</a>
                    <div class="overlay-content">
                    <table> 
                        <tr>
                            <td class="padding-bottom padding-right"> Height:</td>
                            <td id="overlayHeight" class="padding-bottom">${height} m</td>
                        </tr>
                        <tr>
                            <td class="padding-bottom padding-right">Weight:</td>
                            <td class="padding-bottom" id="overlayWeight">${weight} kg</td>
                        </tr>
                        <tr>
                            <td class="padding-bottom padding-right">Base Experience:</td>
                            <td class="padding-bottom" id="overlayBaseExp">${baseExperience}</td>
                        </tr>
                        <tr>
                            <td class="padding-bottom padding-right">Abilities:</td>
                            <td class="padding-bottom" id="overlayAbilities">${abilitiesHTML}</td>
                        </tr>
                    </table>
                    </div>
            </main>

            <footer class="overlay-footer">
                <div class="button" onclick="openPreviousPokemon()"> << </div> <div class="button" onclick="openNextPokemon()">>></div>
            </footer>

        </div>
           `
}


function closePokemonCard() {
    document.getElementById('overlayMain').classList.add('d_none');
    document.getElementById('overlay-card').innerHTML = "";
}


async function openNextPokemon() {
    currentPokemonIndex ++;

    if (currentPokemonIndex >= pokemon.length) {
        currentPokemonIndex = 0;
    }

    let selectedPokemon = pokemon[currentPokemonIndex];
    let id = getIdFromURL(selectedPokemon);

    currentPokemonData = await getPokemonDetails(id);

    document.getElementById('overlayPokemonId').innerText = `#${id}`;
    document.getElementById('overlayPokemonName').innerText = selectedPokemon.name;
    document.getElementById('overlayPokemonImage').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    document.getElementById('overlayHeight').innerText = `${currentPokemonData.height} m`;
    document.getElementById('overlayWeight').innerText = `${currentPokemonData.weight} kg`;
    document.getElementById('overlayBaseExp').innerText = ` ${currentPokemonData.base_experience}`;
    document.getElementById('overlayAbilities').innerHTML = buildAbilitiesHTML(currentPokemonData.abilities);


    let types = await getPokemonTypes(id);
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
    typesHTML += `<span class="pokemon-type overlay-pokemon-type ${types[i]}">${types[i]}</span>`;
    }
    document.getElementById('overlayPokemonTypes').innerHTML = typesHTML;
}


async function openPreviousPokemon() {
    currentPokemonIndex --;

    if (currentPokemonIndex < 0) {
        currentPokemonIndex = pokemon.length -1;
    }

    let selectedPokemon = pokemon[currentPokemonIndex];
    let id = getIdFromURL(selectedPokemon);

    currentPokemonData = await getPokemonDetails(id);

    document.getElementById('overlayPokemonId').innerText = `#${id}`;
    document.getElementById('overlayPokemonName').innerText = selectedPokemon.name;
    document.getElementById('overlayPokemonImage').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    document.getElementById('overlayHeight').innerText = `${currentPokemonData.height} m`;
    document.getElementById('overlayWeight').innerText = `${currentPokemonData.weight} kg`;
    document.getElementById('overlayBaseExp').innerText = `${currentPokemonData.base_experience}`;
    document.getElementById('overlayAbilities').innerHTML = buildAbilitiesHTML(currentPokemonData.abilities);

    let types = await getPokemonTypes(id);
    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
    typesHTML += `<span class="pokemon-type overlay-pokemon-type ${types[i]}">${types[i]}</span>`;
    }
    document.getElementById('overlayPokemonTypes').innerHTML = typesHTML;
}


async function showMorePokemon() {
     let responseMore = await fetch(morePokedex_URL)
    responseToJsonMore = await responseMore.json();
    pokemon = responseToJsonMore.results;

    await showPokemon();
}