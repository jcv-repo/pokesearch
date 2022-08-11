import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchGeneration = async (generation, timeLimit) => {
  if (typeof generation === "number" || typeof generation === "string") {
    const targetUrl =
      process.env.REACT_APP_POKEAPI_URL + "generation/" + generation;
    return await fetchWithTimeout(targetUrl, timeLimit).results;
  } else {
    throw new Error(`${generation} is neither a number or a string`);
  }
};
