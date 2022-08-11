import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchAllGenerations = async (timeLimit) => {
  const targetUrl = process.env.REACT_APP_POKEAPI_URL + "generation";
  const fetch = await fetchWithTimeout(targetUrl, timeLimit);
  return fetch.results;
};
