import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchPokemon = async (pokemon, timeLimit) => {
  if (typeof pokemon === "number" || typeof pokemon === "string") {
    const targetUrl = process.env.REACT_APP_POKEAPI_URL + "pokemon/" + pokemon;
    return await fetchWithTimeout(targetUrl, timeLimit);
  } else {
    throw new Error(`${pokemon} is neither a number or a string`);
  }
};
