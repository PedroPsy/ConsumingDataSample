const state ={
    starWarsRootContainerEnable: false,
}

const api_url = 'https://swapi.dev/api/planets/3/'

window.addEventListener('load', loadplanets)
document.getElementById('select-planets').addEventListener('change', selectClimate)

async function loadClimates() {
    const climatesData = await fetch(api_url)
    const climates = await climatesData.json()
    const selectClimate = document.getElementById('select-climate')
    climates.results.array.forEach(element => {
        const climatesOptions = document.createElement('option')
        climatesOptions.innerText= element.name
        climatesOptions.value = element.url
        selectClimate.append(climatesOptions)
    });

    const defaultPlanet = document.getElementById('default-planets')
    defaultPlanet.textContent = 'Choose an climate'
}

async function selectClimate() {
    const selectedClimate = document.getElementById("select-climate").value
    state.starWarsRootContainerEnable = !(selectedClimate === "default")
    addPlanetList(selectedType)
}


async function addPlanetList(type) {
    state.starWarsRootContainerEnable ?
        buildStarWarsRootContainer(type) :
        destroyStarWarsRootContainer()
}


const destroyStarWarsRootContainer = () =>{

    if(document.getElementById('seeInfo')){
        document.getElementById('seeInfo').removeEventListener('click', viewPlanetData)
    }

    if(document.getElementById('starWarsRootContainer'))
        document.getElementById('starWarsRootContainer').remove()
}

const buildStarWarsRootContainer = async (type) =>{

    //Root container
    if(!document.getElementById('starWarsRootContainer')){
        // Build root container
        const starWarsRootContainer = buildRootContainer()
        //Selection list
        buildPlaninList(starWarsRootContainer, 'selectPlanetList')
        //Info buttom
        buildInfoButtom(starWarsRootContainer)
        
    }
    populatePlanetList(type, 'selectPlanetList')

}


function buildRootContainer(){
    const starWarsRootContainer = document.createElement('div')
    starWarsRootContainer.setAttribute("id", "starWarsRootContainer")
    const cabecalhoStarwars = document.createElement('h2')
    cabecalhoStarwars.id = 'selectPlanet'
    cabecalhoStarwars.textContent = 'Choose climate'
    starWarsRootContainer.append(cabecalhoStarwars)
    document.body.append(starWarsRootContainer)

    return pokemonRootContainer
}
function buildPlaninList(starWarsRootContainer, listName){
    const selectPlanet = document.createElement('select');
    selectPlanet.id = listName
    starWarsRootContainer.append(selectPlanet)
}
function buildInfoButtom(starWarsRootContainer) {
    const searchButtom = document.createElement('input')
    searchButtom.type = 'submit'
    searchButtom.value = 'See info'
    searchButtom.id = 'seeInfo'
    starWarsRootContainer.append(searchButtom)
    document.getElementById('seeInfo').addEventListener('click', viewPlanetData)
}

async function populatePlanetList(type, listName) {
    const planetList = document.getElementById(listName)
    // Clear list and populate again
    planetList.textContent = ''
    const planetDefault = document.createElement('option')
    planetDefault.id = 'planetDefault'
    planetDefault.value = 'default'
    planetDefault.innerText = 'Loading planets...'
    planetList.append(planetDefault)

    //Populate list
    planetData = await fetch(`${type}`)
    planets = await planetData.json()
    planets.planets.forEach(planetiten => {
        const pokemonOption = document.createElement('option')
        pokemonOption.innerText = planetiten.Planet.name
        PlanetOption.value = planetiten.Planet.url
        PlanetOption.append(PlanetOption)
    });
    planetDefault.innerText = 'Choose a planet...'
}

const viewPlanetData = async (event) => {
    const Planet = document.getElementById('selectPlanetList').value
    if (Planet === 'default') {
        (document.getElementById('predata') && document.getElementById('predata').remove())
        return
    }
    
    let data = document.getElementById('predata')
    if (!data) {
        data = document.createElement('pre')
        data.id = 'predata'
    }
    
    const planetDataRaw = await fetch(`${planet}`)
    const planetData = await planetDataRaw.json()
    data.innerHTML = `
    Abilities: ${planetData.abilities.reduce((accumulator, element) => { return `${element.ability.name} ${accumulator}`},"")}
    Name: ${planetData.name}
    rotation_period: ${planetData.rotation_period}
    orbital_period: ${planetData.orbital_period}
    diameter: ${planetData.diameter}
    climate: ${planetData.climate}
    gravity: ${planetData.gravity}
    terrain: ${planetData.terrain}
    surface_water: ${planetData.surface_water}
    population: ${planetData.population}


    `
    document.getElementById('PlanetRootContainer').append(data)
}