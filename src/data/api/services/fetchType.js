import { fetchWithTimeout } from "./fetchWithTimeout";

export const fetchType = async (type, timeLimit) => {
  if (typeof type === "number" || typeof type === "string") {
    const targetUrl = process.env.REACT_APP_POKEAPI_URL + "type/" + type;
    return await fetchWithTimeout(targetUrl, timeLimit);
  } else {
    throw new Error(`${type} is neither a number or a string`);
  }
};
