const baseUrl = process.env.REACT_APP_POKEAPI_URL;
const allPokemonApiUrl = "pokemon?limit=100000&offset=0";
const allTypesApiUrl = "type";
const pokemonApiUrl = "pokemon";
const pokemonSpeciesApiUrl = "pokemon-species";

const fetchWithTimeout = async (url, timeLimit = 0) => {
  const controller = new AbortController();
  let timeout;
  if (timeLimit !== 0) {
    timeout = setTimeout(() => controller.abort(), timeLimit);
  }
  const response = await fetch(url, { signal: controller.signal });
  if (timeLimit !== 0) clearTimeout(timeout);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Data could not be fetched. Probably no results");
  }
};

const fetchList = async (query, timeLimit) => {
  try {
    const result = await fetchWithTimeout(query, timeLimit);
    return result.results;
  } catch (error) {
    switch (error.name) {
      case "AbortError":
        throw new Error(error.message + "Could it be a connection error?");
      case "TypeError":
        throw new Error("There might be a connection error");
      default:
        throw new Error("Something went extremely wrong");
    }
  }
};

const fetchList2 = async (query, timeLimit) => {
  try {
    const result = await fetchWithTimeout(query, timeLimit);
    return result;
  } catch (error) {
    switch (error.name) {
      case "AbortError":
        throw new Error(error.message + "Could it be a connection error?");
      case "TypeError":
        throw new Error("There might be a connection error");
      default:
        throw new Error("Something went extremely wrong");
    }
  }
};

const fetchAllPokemonList = async (timeLimit) => {
  try {
    return fetchList(baseUrl + allPokemonApiUrl, timeLimit);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchPokemonTypesList = async (timeLimit) => {
  try {
    return fetchList(baseUrl + allTypesApiUrl, timeLimit);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchPokemonRealTypesList = async (timeLimit) => {
  try {
    const result = await fetchPokemonTypesList(timeLimit);
    return result.slice(0, -2);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchAllPokemonOfType = async (typeIndex, timeLimit) => {
  try {
    return await fetchList2(
      `${baseUrl}${allTypesApiUrl}/${typeIndex}/`,
      timeLimit
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchPokemonFromID = async (typeIndex, timeLimit) => {
  try {
    return await fetchList2(
      `${baseUrl}${pokemonApiUrl}/${typeIndex}/`,
      timeLimit
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchPokemonSpeciesFromID = async (typeIndex, timeLimit) => {
  try {
    return await fetchList2(
      `${baseUrl}${pokemonSpeciesApiUrl}/${typeIndex}/`,
      timeLimit
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const extractPokemonIDsFromList = (listOfPokemon) => {
  if (Array.isArray(listOfPokemon)) {
    let listOfPokemonIDs = new Array();

    listOfPokemon.forEach(({ pokemon }) => {
      const regex = new RegExp(`${baseUrl}pokemon/(\\d+)/`, "gi");
      const match = [...pokemon.url.matchAll(regex)];
      const integer = parseInt(match[0][1]);
      if (!isNaN(integer)) {
        listOfPokemonIDs.push(integer);
      }
    });
    return listOfPokemonIDs;
  } else {
    throw TypeError(
      listOfPokemon + " must be an Array of Pokemon from the API"
    );
  }
};

const getPokemonUrlFromID = (pokemonID) => {
  return `${baseUrl}pokemon/${pokemonID}`;
};

export {
  fetchAllPokemonList,
  fetchPokemonTypesList,
  fetchPokemonRealTypesList,
  fetchAllPokemonOfType,
  fetchPokemonFromID,
  fetchPokemonSpeciesFromID,
  extractPokemonIDsFromList,
  getPokemonUrlFromID,
};
