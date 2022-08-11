import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchAllAbilities = async (timeLimit) => {
  const targetUrl =
    process.env.REACT_APP_POKEAPI_URL + "ability?limit=100000&offset=0";
  const fetch = await fetchWithTimeout(targetUrl, timeLimit);
  return fetch.results;
};
