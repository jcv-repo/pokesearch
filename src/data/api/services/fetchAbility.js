import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchAbility = async (ability, timeLimit) => {
  if (typeof ability === "number" || typeof ability === "string") {
    const targetUrl = process.env.REACT_APP_POKEAPI_URL + "ability/" + ability;
    return await fetchWithTimeout(targetUrl, timeLimit);
  } else {
    throw new Error(`${ability} is neither a number or a string`);
  }
};
