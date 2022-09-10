export const getPokedexIndexFromPokemon = (pokemonData) => {
  const regex = new RegExp(
    `${process.env.REACT_APP_POKEAPI_URL}(?:pokemon-species)/(\\d+)`,
    "gi"
  );
  const match = regex.exec(pokemonData.species.url);

  return match === null ? null : parseInt(match[1]);
};
