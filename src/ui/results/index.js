// React
import React, { useState, useEffect, useRef } from "react";
// Components
import { Header } from "./components/Header";
import { PokemonBox } from "./components/PokemonBox";
import { ListOfPokemon } from "./components/ListOfPokemon";
import { useAppContext } from "#app/context";
import { usePokemonDataContext } from "#data/context";
// Utils & helpers
import { getDeconstructedSearch } from "#utils/getDeconstructedSearch";
import { matchArrays } from "#utils/matchArrays";
import { getStateErrorMessageWithStatus } from "#app/helpers/getStateErrorMessageWithStatus";
import { extractDataListPokemonIDs } from "#data/api/utils/extractDataListPokemonIDs";
import { getSpeciesFromPokemon } from "#data/api/utils/getSpeciesFromPokemon";
// Config
import { config } from "./config";

//
//
//

export const SearchResults = ({ searchQuery, setSearchQuery }) => {
  //
  // useState declarations
  //

  const [queryResults, setQueryResults] = useState({
    query: null,
    haveResults: null,
    results: [],
  });
  const [resultsData, setResultsData] = useState({
    pokemon: {},
    species: {},
    availableQuery: [],
    areQueryResultsCompleted: true,
  });
  const { changeAppState } = useAppContext();

  //
  // Other variables
  //

  const requestPokemonData = usePokemonDataContext();
  const isLoadingData = useRef({ pokemon: false, species: false });
  const lastPageLoaded = useRef(0);

  //
  // Utils
  //

  const getRequest = async (category, params) => {
    const request = params
      ? await requestPokemonData(category, params)
      : await requestPokemonData(category);

    if (!request.ok) {
      changeAppState({
        status: "error",
        message: getStateErrorMessageWithStatus(request.status),
      });
    }
    return request.results;
  };

  const setData = (data = {}, shouldAdd = {}) => {
    setResultsData((prevState) => {
      const pokemonData = shouldAdd.pokemon
        ? { ...prevState.pokemon, ...(data.pokemon || {}) }
        : data.pokemon || prevState.pokemon;
      const speciesData = shouldAdd.species
        ? { ...prevState.species, ...(data.species || {}) }
        : data.species || prevState.species;

      if (data.pokemon) {
        setIsLoadingData(false, "pokemon");
      }
      if (data.species) {
        setIsLoadingData(false, "species");
      }

      return {
        pokemon: pokemonData,
        species: speciesData,
        availableQuery: Object.keys(pokemonData).filter((pokemon) =>
          queryResults.results.includes(pokemon)
        ),
        areQueryResultsCompleted: queryResults.results.every(
          (result) => pokemonData[result] !== undefined
        ),
      };
    });
  };

  const setIsLoadingData = (isLoading, typeOfData = "both") => {
    const isPokemonLoading =
      typeOfData === "pokemon" || typeOfData === "both"
        ? isLoading
        : isLoadingData.current.pokemon;

    const isSpeciesLoading =
      typeOfData === "species" || typeOfData === "both"
        ? isLoading
        : isLoadingData.current.species;

    isLoadingData.current = {
      pokemon: isPokemonLoading,
      species: isSpeciesLoading,
    };
  };

  //
  // Callbacks
  //

  const setId = (id) => {
    setSearchQuery({ query: searchQuery.query, id: id || null });
  };

  const loadMoreResults = async () => {
    if (resultsData.areQueryResultsCompleted) {
      console.warn(
        "The search results are fully displayed and there is nothing more to add"
      );
      return;
    }

    if (isLoadingData.current.pokemon === true) {
      return;
    }

    setIsLoadingData(true, "pokemon");
    changeAppState({
      status: "busy",
      message: "Adding more results",
      shouldGiveUserConsent: true,
    });

    const results = {};
    const currentPageSize = lastPageLoaded.current * config.pageSize;
    const nextRequest = queryResults.results.slice(
      currentPageSize,
      currentPageSize + config.pageSize
    );

    const request = await getRequest("pokemon", nextRequest);
    nextRequest.forEach((pokemon, index) => {
      results[pokemon] = request[index];
    });

    changeAppState({ status: "ready" });
    lastPageLoaded.current += 1;
    setData({ pokemon: results }, { pokemon: true });
  };

  //
  // useEffects & data requests
  //

  useEffect(() => {
    const findQueryResults = async () => {
      let results;

      if (searchQuery.query) {
        changeAppState({
          status: "waiting",
          message: "Waiting for query's results ...",
        });

        const deconstructedSearch = getDeconstructedSearch(searchQuery.query);
        let listsOfPokemonIDs = [];

        //
        //
        // TODO:
        // add a lil message when the certain criteria has no pokemons on it
        // for some reason (ex. aqua-boost)
        //
        //

        for (const queryItem of deconstructedSearch) {
          const fetch = await getRequest(queryItem.category, [queryItem.match]);

          listsOfPokemonIDs.push(
            extractDataListPokemonIDs(fetch[0], queryItem.category)
          );
        }
        results = matchArrays(...listsOfPokemonIDs);

        changeAppState({ status: "ready" });
      }

      setQueryResults({
        query: searchQuery.query,
        haveResults: results ? results.length !== 0 : false,
        results: results ? results : [],
      });
    };

    findQueryResults();
  }, [searchQuery.query]);

  useEffect(() => {
    const updatePokemonData = async () => {
      let results = {};

      if (queryResults.haveResults) {
        changeAppState({
          status: "waiting",
          message: "Fetching search results...",
        });

        const initialRequest = queryResults.results.slice(0, config.pageSize);
        const request = await getRequest("pokemon", initialRequest);

        initialRequest.forEach((pokemon, index) => {
          results[pokemon] = request[index];
        });

        changeAppState({ status: "ready" });
      }

      lastPageLoaded.current = 1;
      setData({ pokemon: results }, { pokemon: true });
    };

    updatePokemonData();
  }, [queryResults.query]);

  useEffect(() => {
    const updateSpeciesData = async () => {
      setIsLoadingData(true, "species");

      const storedPokemonId = resultsData.pokemon[searchQuery.id];

      let pokemonRequest;
      if (!storedPokemonId) {
        pokemonRequest = (await getRequest("pokemon", [searchQuery.id]))[0];
      }

      let speciesRequest = (
        await getRequest("pokemon-species", [
          getSpeciesFromPokemon(storedPokemonId || pokemonRequest),
        ])
      )[0];

      const results = {};
      results.pokemon = storedPokemonId
        ? {}
        : { [searchQuery.id]: pokemonRequest };
      results.species = { [searchQuery.id]: speciesRequest };

      setData(results, { pokemon: true });
    };

    if (searchQuery.id) {
      updateSpeciesData();
    }
  }, [searchQuery.id]);

  //
  //
  //

  //
  //
  //

  console.log(queryResults.haveResults, lastPageLoaded.current);
  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main
        className={`block ${
          searchQuery.id
            ? "sm:overflow-hidden sm:h-[100vh]"
            : "lg:overflow-visible lg:h-auto"
        } xl:overflow-visible xl:h-full min-h-[inherit] lg:min-h-[100vh] pt-[6.5rem] sm:pt-16 xl:pt-20 bg-tertiary-two`}
      >
        <section className="sm:h-full xl:w-[1180px] px-2 md:px-4 xl:px-0 xl:mx-auto">
          {searchQuery.query ? (
            <>
              {queryResults.haveResults === true && (
                <div
                  className={
                    searchQuery.id &&
                    "sm:flex sm:flex-row-reverse xl:flex-row sm:h-full"
                  }
                >
                  {searchQuery.id && (
                    <PokemonBox
                      pokemon={resultsData.pokemon[searchQuery.id]}
                      pokemonSpecies={resultsData.species[searchQuery.id]}
                      setIdCallback={setId}
                      shouldScroll={false}
                    />
                  )}
                  <ListOfPokemon
                    queryResults={queryResults.results}
                    pokemonData={resultsData.pokemon}
                    availableQuery={resultsData.availableQuery}
                    currentPage={lastPageLoaded.current}
                    isLoadingPokemon={isLoadingData.current.pokemon}
                    areQueryResultsCompleted={
                      resultsData.areQueryResultsCompleted
                    }
                    queryId={searchQuery.id}
                    setIdCallback={setId}
                    pageSize={config.pageSize}
                    loadMoreCallback={loadMoreResults}
                    loadMoreMessage={config.loadMoreButtonMessage}
                    shouldInfiniteScroll={config.enableInfiniteScrolling}
                  />
                </div>
              )}
              {queryResults.haveResults === false && (
                <>{config.noResultsMessage}</>
              )}
            </>
          ) : (
            "No search has been made yet"
          )}
        </section>
      </main>
    </>
  );
};
