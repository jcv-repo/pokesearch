import { fetchAllPokemon } from "./services/fetchAllPokemon";
import { fetchAllPokemonSpecies } from "./services/fetchAllPokemonSpecies";
import { fetchAllPokemonTypes } from "./services/fetchAllPokemonTypes";
import { fetchAllAbilities } from "./services/fetchAllAbilities";
import { fetchAllGenerations } from "./services/fetchAllGenerations";
import { fetchPokemon } from "./services/fetchPokemon";
import { fetchPokemonSpecies } from "./services/fetchPokemonSpecies";
import { fetchType } from "./services/fetchType";
import { fetchAbility } from "./services/fetchAbility";
import { fetchGeneration } from "./services/fetchGeneration";

import { filterInvalidPokemonTypes } from "./utils/filterInvalidPokemonTypes";

export const fetchAPI = async (category, params = null) => {
  const timeLimit = 8000;
  const isParamsEmpty = params === null;

  const getFetch = async () => {
    switch (category) {
      case "pokemon":
        return isParamsEmpty
          ? await fetchAllPokemon(timeLimit)
          : await fetchPokemon(params, timeLimit);

      case "pokemon-species":
        return isParamsEmpty
          ? await fetchAllPokemonSpecies(timeLimit)
          : await fetchPokemonSpecies(params, timeLimit);

      case "type":
        return isParamsEmpty
          ? filterInvalidPokemonTypes(await fetchAllPokemonTypes(timeLimit))
          : await fetchType(params, timeLimit);

      case "ability":
        return isParamsEmpty
          ? await fetchAllAbilities(timeLimit)
          : await fetchAbility(params, timeLimit);

      case "generation":
        return isParamsEmpty
          ? await fetchAllGenerations(timeLimit)
          : await fetchGeneration(params, timeLimit);

      default:
        throw {
          status: 404,
          message: `Invalid request, ${category} is not handled in the API`,
        };
    }
  };

  try {
    const result = await getFetch();

    return {
      ok: true,
      status: 200,
      message: "Success",
      results: result,
    };
  } catch (response) {
    if (response instanceof Error) {
      throw response; // if it is an actual error
    }

    return {
      ok: false,
      status: response.status,
      message: response.message,
      results: [],
    };
  }
};
