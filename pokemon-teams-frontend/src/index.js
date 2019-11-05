const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainerArray => trainerArray.forEach(trainerObj => renderTrainer(trainerObj)))
}


{/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */}

// Render Trainer

function renderTrainer(trainerObj) { 
    
    // create div
    let div = document.createElement('div')
    div.classList.add("card")
    // div.setAttribute("data-id", trainerObj.id)
    div.dataset.trainerId = trainerObj.id

    // create p 
    let p = document.createElement('p')
    p.innerText = trainerObj.name



    // create button
    let btn = document.createElement("button")
    btn.innerText = "Add Pokemon"
    
    btn.addEventListener("click", postPokemon)
    btn.dataset.trainerId = trainerObj.id
    

    // create ul 
    let ul = document.createElement("ul")

    trainerObj.pokemons.forEach(pokemonObj => renderPokemon(pokemonObj, ul))

    div.append(p, btn, ul)

    let main = document.querySelector("main")
    main.appendChild(div)
    
}

// Post Pokemon

function postPokemon(event) {

    if (event.currentTarget.parentElement.children[2].children.length < 6) {
        let trainerId = event.currentTarget.dataset.trainerId

    let ul = event.currentTarget.nextElementSibling
    

    let data = {
        trainer_id: trainerId
    }

    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(pokemonObj => renderPokemon(pokemonObj, ul))
    
    } else {
        alert("hey")
    }
    
}

// Render Pokemon

function renderPokemon(pokemonObj, ul) {
    // create li
    let li = document.createElement('li')
    li.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`

    // create button
    let btn = document.createElement("button")
    btn.classList.add("release")
    btn.addEventListener("click", removePokemon)
    btn.innerText = "release"
    btn.dataset.pokemonId = pokemonObj.id

    li.appendChild(btn)
    ul.appendChild(li)
    
}

// Remove Pokemon

function removePokemon(event) {
    let pokemonId = event.currentTarget.dataset.pokemonId

    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: "DELETE"
    }).then(() => {
        let li = event.target.parentElement
        li.remove()
    })
}
