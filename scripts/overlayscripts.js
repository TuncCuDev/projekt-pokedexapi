function renderPokemonOverlayCard(id, selectedPokemon, currentPokemonData, types, height, weight, baseExperience) {
    let abilitiesHTML = buildAbilitiesHTML(currentPokemonData.abilities);
    
    let overlayMain = document.getElementById('overlayMain');
    let overlayCard = document.getElementById('overlay-card');
    overlayMain.classList.remove('d_none');

    overlayCard.innerHTML = getOverlayCard(id, selectedPokemon.name, types, height, weight, baseExperience, abilitiesHTML);
}


function getOverlayCard(id, name, types, height, weight, baseExperience, abilitiesHTML) {
    let typesHTML = "";

    for (let i = 0; i < types.length; i++) {
        typesHTML += `<span class="pokemon-type overlay-pokemon-type ${types[i]}">${types[i]}</span>`;
    } return openOverlayCard(id, name, typesHTML, height, weight, baseExperience, abilitiesHTML);
}


function closePokemonCard() {
    document.getElementById('overlayMain').classList.add('d_none');
    document.body.classList.remove('no-scroll');
    document.getElementById('overlay-card').innerHTML = "";
}


async function openNextPokemon() {
    currentPokemonIndex ++;
    
    if (currentPokemonIndex >= pokemon.length) {
        currentPokemonIndex = 0;
    }

    selectedPokemon = pokemon[currentPokemonIndex];
    currentPokemonId = getIdFromURL(selectedPokemon);

    currentPokemonData = await getPokemonDetails(currentPokemonId);

    updatePokemonOverlay();
    await getTypesPokemonOverlay();
}


async function openPreviousPokemon() {
    currentPokemonIndex --;

    if (currentPokemonIndex < 0) {
        currentPokemonIndex = pokemon.length -1;
    }

    selectedPokemon = pokemon[currentPokemonIndex];
    currentPokemonId = getIdFromURL(selectedPokemon);

    currentPokemonData = await getPokemonDetails(currentPokemonId);

    updatePokemonOverlay();
    await getTypesPokemonOverlay();
}


async function getTypesPokemonOverlay() {
    let types = await getPokemonTypes(currentPokemonId);

    let typesHTML = "";
    for (let i = 0; i < types.length; i++) {
        typesHTML += `<span class="pokemon-type overlay-pokemon-type ${types[i]}">${types[i]}</span>`;
        }
    document.getElementById('overlayPokemonTypes').innerHTML = typesHTML;
}


function updatePokemonOverlay() {
    document.getElementById('overlayPokemonId').innerText = `#${currentPokemonId}`;
    document.getElementById('overlayPokemonName').innerText = selectedPokemon.name;
    document.getElementById('overlayPokemonImage').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemonId}.png`
    document.getElementById('overlayHeight').innerText = `${currentPokemonData.height} m`;
    document.getElementById('overlayWeight').innerText = `${currentPokemonData.weight} kg`;
    document.getElementById('overlayBaseExp').innerText = `${currentPokemonData.base_experience}`;
    document.getElementById('overlayAbilities').innerHTML = buildAbilitiesHTML(currentPokemonData.abilities);
}



