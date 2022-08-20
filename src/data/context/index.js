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
  const isStoreRoutineBusy = useRef(false);
  const firstSetup = useRef(true);

  //
  // Helpers
  //

  const doStoreInDatabaseRoutine = async () => {
    const fetching = getFetching();

    if (fetching.length === 0) {
      return;
    }

    if (!isStoreRoutineBusy.current) {
      isStoreRoutineBusy.current = true;

      const promises = await Promise.all(
        fetching.map(({ promise }) => promise)
      );

      isStoreRoutineBusy.current = false;

      const wasSuccessful = promises.every(({ ok }) => ok);

      if (wasSuccessful) {
        if (getFetching().length > 0) {
          doStoreInDatabaseRoutine();
        }
      }
    }
  };

  const storeData = (data, category, params = null) => {
    pokemonData.current[category][params || config.listOfCategoryKeyword] =
      data;
    // storeInDatabase(data, category, params);
  };

  const isDataStored = (category, params) =>
    (params || config.listOfCategoryKeyword) in pokemonData.current[category];

  const getData = (category, params) => {
    //
    //
    //
    // TODO
    // Esta función hace el chequeo de si la info está cacheada en el objeto
    // y obtener la info en la base de datos si no existe, claramente deberían
    // ser cosas distintas porque abajo estoy cacheando el objeto pero sin querrer
    // obtenerlo
    //
    //
    //

    return (
      pokemonData.current[category][params || config.listOfCategoryKeyword] ||
      null
    );

    // const databaseRequest = await getFromDatabase(
    //   category,
    //   params || null
    // );

    // if (databaseRequest) {
    //   pokemonData.current[category][
    //     params || config.listOfCategoryKeyword
    //   ] = databaseRequest;
    // }

    // return databaseRequest;
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

    doStoreInDatabaseRoutine();

    return getRequestObject({ status: lastFetchStatus, results: results });
  };

  //
  // Initialization
  //

  if (firstSetup.current) {
    const initializeData = async () => {
      createDatabase(config.availableData);
      if (config.shouldPreload) {
        for (const category of config.availableData) {
          //
          //
          // TODO
          // En este instante se está cacheando en el Pokemon Data la info de
          // database, uno por uno idealmente debería cargarse todo el objeto de una
          //
          // also hay que separar el getData en solo una función que cachea la cosa
          //
          //

          getData(category);

          if (!isDataStored(category)) {
            const data = await requestPokemonData(category);
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
