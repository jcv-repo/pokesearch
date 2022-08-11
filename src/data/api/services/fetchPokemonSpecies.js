import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchPokemonSpecies = async (pokemonSpecies, timeLimit) => {
  if (
    typeof pokemonSpecies === "number" ||
    typeof pokemonSpecies === "string"
  ) {
    const targetUrl =
      process.env.REACT_APP_POKEAPI_URL + "pokemon-species/" + pokemonSpecies;
    return await fetchWithTimeout(targetUrl, timeLimit);
  } else {
    throw new Error(`${pokemonSpecies} is neither a number or a string`);
  }
};
