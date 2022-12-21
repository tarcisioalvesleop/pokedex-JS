
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)  
    const [type] = types //types.get(0)

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    //requisição usando o fetch (assincrono) manipulando em caso de erro
    return fetch(url) //buscando a lista de pokemons
        .then((response) => response.json()) //convertendo para json usando function reduzida 1 linha
        .then((jsonBody) => jsonBody.results) //pegando a lista resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando os detalhes dos pokemons
        .then((detailRequests) => Promise.all(detailRequests)) //esperando todas as requisições terminar
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}
