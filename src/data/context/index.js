// React
import React, { createContext, useContext, useEffect, useRef } from "react";
// Fetch
import { fetchAPI } from "#data/api/fetchAPI";
// Database
import { createDatabase } from "./database/db";
import { getFromDatabase } from "./database/getFromDatabase";
import { storeInDatabase } from "./database/storeInDatabase";
// Other
import { getRequestObject } from "./helpers/getRequestObject";
import { useFetching } from "./hooks/useFetching";
// Config
import { config } from "./config";

//
// Create context
//

const PokemonDataContext = createContext();

//
//
//

const PokemonDataContextProvider = ({ children }) => {
  //
  // Refs and data objects
  //

  const pokemonData = useRef(
    (() => {
      const data = {};
      config.availableData.forEach((category) => {
        data[category] = {};
      });
      return data;
    })()
  );

  const {
    getFetching,
    findIndexInFetchState,
    addToFetchState,
    removeFromFetchState,
  } = useFetching();

  const storeRoutine = useRef({
    isBusy: false,
    updatedCategories: [],
    timeoutRoutine: null,
  });

  const firstSetup = useRef(true);

  //
  // Helpers
  //

  const storeData = (data, category, params = null) => {
    pokemonData.current[category][params || config.listOfCategoryKeyword] =
      data;
    // storeInDatabase(data, category, params);
  };

  const isDataStored = (category, params) =>
    (params || config.listOfCategoryKeyword) in pokemonData.current[category];

  const getData = (category, params) =>
    pokemonData.current[category][params || config.listOfCategoryKeyword] ||
    null;

  const refreshDataFromDatabase = async () => {
    const database = await getFromDatabase();
    if (database !== null) {
      pokemonData.current = database;
      return true;
    } else {
      return false;
    }
  };

  const updateDatabase = () => {
    storeInDatabase(pokemonData.current);
  };

  const doStoreInDatabaseRoutine = async (lastCategoryUpdated) => {
    const fetching = getFetching();

    if (storeRoutine.current.isBusy || fetching.length === 0) {
      return;
    }

    if (storeRoutine.current.timeoutRoutine !== null) {
      clearTimeout(storeRoutine.current.timeoutRoutine);
      storeRoutine.current.timeoutRoutine = null;
    }

    if (!storeRoutine.current.updatedCategories.includes(lastCategoryUpdated)) {
      storeRoutine.current.updatedCategories.push(lastCategoryUpdated);
    }

    storeRoutine.current.isBusy = true;

    const promises = await Promise.all(fetching.map(({ promise }) => promise));

    storeRoutine.current.isBusy = false;

    const wasSuccessful = promises.every(({ ok }) => ok);

    if (wasSuccessful) {
      if (getFetching().length === 0) {
        storeRoutine.current.timeoutRoutine = setTimeout(() => {
          updateDatabase();

          storeRoutine.current.timeoutRoutine = null;
          storeRoutine.current.updatedCategories = [];
        }, config.intervalBeforeUpdateDatabase);
      }
    }
  };

  //
  // Fetch magic
  //

  const getAndFetchData = async (category, params = null) => {
    if (!config.availableData.includes(category)) {
      return getRequestObject({
        status: 404,
        message: `${category} is not a type of data that exists in the database`,
      });
    }

    const isParamsEmpty = params === null;

    if (!isDataStored(category, isParamsEmpty ? null : params)) {
      const requestID = isParamsEmpty ? category : `${category}-${params}`;
      const indexOfFetchState = findIndexInFetchState(requestID);

      if (indexOfFetchState !== -1) {
        //
        //
        //
        // TODO
        // esta devolviendo un objeto que no proviene del pokemonData
        //
        //
        //

        const result = await getFetching()[indexOfFetchState].promise;
        return getRequestObject(result);
      }

      let fetch = isParamsEmpty
        ? fetchAPI(category)
        : fetchAPI(category, params);

      addToFetchState(requestID, fetch);

      doStoreInDatabaseRoutine(category);

      const results = await fetch;

      removeFromFetchState(requestID);

      if (results.ok) {
        storeData(results.results, category, isParamsEmpty ? null : params);
      } else {
        return getRequestObject(results); // return error
      }
    }

    return getRequestObject({
      status: 200,
      results: getData(category, isParamsEmpty ? null : params),
    });
  };

  //
  // The thing we gonna pass down in the context
  //

  const requestPokemonData = async (category, params) => {
    if (!params) {
      const results = await getAndFetchData(category);
      return getRequestObject(results);
    }
    if (!Array.isArray(params)) {
      throw new Error(
        `${params} must be an array with the requested parameters`
      );
    }

    let results = [];
    let lastFetchStatus;

    for (const param of params) {
      const fetch = await getAndFetchData(category, param);
      lastFetchStatus = fetch.status;

      if (fetch.ok) {
        results.push(fetch.results);
      } else {
        return getRequestObject({
          status: lastFetchStatus,
          results: results,
        });
      }
    }

    return getRequestObject({ status: lastFetchStatus, results: results });
  };

  //
  // Initialization
  //

  if (firstSetup.current) {
    const initializeData = async () => {
      createDatabase(config.availableData);

      await refreshDataFromDatabase();

      if (config.shouldPreload) {
        for (const category of config.availableData) {
          if (!isDataStored(category)) {
            await requestPokemonData(category);
          }
        }
        console.log("ok", pokemonData);
      }
    };

    initializeData();
  }

  useEffect(() => {
    firstSetup.current = false;
  }, []);

  //
  //
  //

  //
  //
  //

  return (
    <PokemonDataContext.Provider value={requestPokemonData}>
      {children}
    </PokemonDataContext.Provider>
  );
};

//
// Context hacks
//

const usePokemonDataContext = () => {
  const context = useContext(PokemonDataContext);

  if (context === undefined) {
    throw new Error("usePokemonDataContext was used outside of its Provider");
  }

  return context;
};

export { PokemonDataContextProvider, usePokemonDataContext };
