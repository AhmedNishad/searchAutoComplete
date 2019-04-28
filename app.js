const searchInput = document.querySelector('#search-input');
const resultDiv = document.querySelector('.results')



const handleSearch = async (search)=>{
    let data = await fetch('./pokedex.json');
    const pokemon = await data.json();


    let filteredPokemon = pokemon.pokemon.filter(p=>{
        let regex = new RegExp(`^${search}`, 'gi')
       return p.name.match(regex)
    })

    if(search === ""){
        filteredPokemon = []
    }
    
    generateHTML(filteredPokemon)
}

function generateHTML(pokemon){
    let pokemonHtml = pokemon.map((p)=>{
        let html = `<div class='pokemonSearchItem' p_id=${p.id}>
        <h4>${p.name}</h4>
        <h5>${p.type}
        </div>`
        return html
    })

    let pokemonText = pokemonHtml.join(' ');
    resultDiv.innerHTML = pokemonText; 
}

const findPokemonById = async (id,el)=>{
    let res = await fetch('./pokedex.json');
    let data = await res.json()
    let relevantPokemon = data.pokemon.filter(p=>{
        return p.id == id
    })
    addToDom(relevantPokemon)

    function addToDom(pokemon){
        if(el.getAttribute('image') == 'true'){
            
            el.removeChild(el.children[2])
            el.setAttribute('image', 'false')
            
        }else{
            let item = pokemon[0]
            let html = `<img src=${item.img}>`
            el.innerHTML += html
            el.setAttribute('image', 'true')
        }
    }
}

document.body.addEventListener('click', e=>{
    if(e.target.parentElement.className == "pokemonSearchItem"){
       findPokemonById(event.target.parentElement.getAttribute('p_id'), e.target.parentElement)
    }
})

searchInput.addEventListener('input', ()=>{
    handleSearch(searchInput.value)
}
    )