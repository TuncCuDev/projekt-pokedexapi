function showPokemonCard(singlePokemon, id, typesHTML) {
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


function openOverlayCard(id, name, typesHTML, height, weight, baseExperience, abilitiesHTML) {
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
        </div>`
}

