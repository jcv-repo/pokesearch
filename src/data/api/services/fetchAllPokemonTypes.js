import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchAllPokemonTypes = async (timeLimit) => {
  const targetUrl = process.env.REACT_APP_POKEAPI_URL + "type";
  const fetch = await fetchWithTimeout(targetUrl, timeLimit);
  return fetch.results;
};
