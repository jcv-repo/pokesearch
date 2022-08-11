// React
import React, { useState, useEffect } from "react";
// Components
import { Header } from "./components/Header";
import { PokemonBox } from "./components/PokemonBox2";
import { PokemonItem } from "./components/PokemonItem";
import { useAppContext } from "#app/context";
import { usePokemonDataContext } from "#data/context";
// Utils & helpers
import { getDeconstructedSearch } from "#utils/getDeconstructedSearch";
import { matchArrays } from "#utils/matchArrays";
import { getStateErrorMessageWithStatus } from "#app/helpers/getStateErrorMessageWithStatus";
import { extractDataListPokemonIDs } from "#data/api/utils/extractDataListPokemonIDs";

//
//
//

export const SearchResults = ({
  searchQuery,
  setSearchQuery,
  className = "",
}) => {
  //
  // Configs
  //

  const pageSize = 8;

  //
  // useState declarations
  //

  const [queryResults, setQueryResults] = useState({
    query: null,
    haveResults: null,
    results: [],
  });
  const [resultsData, setResultsData] = useState({
    query: null,
    id: null,
    areQueryResultsCompleted: true,
  });
  const { searchState, changeAppState } = useAppContext();

  //
  // Other variables
  //

  const requestPokemonData = usePokemonDataContext();
  const selectedIndex = resultsData.query
    ? resultsData.query.findIndex(
        ({ id: pokemonID }) => Number(searchQuery.id) === pokemonID
      )
    : -1;

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

      throw new Error(request.message);
    }
    return request.results;
  };

  //
  // Callbacks
  //

  const setID = (id) => {
    setSearchQuery({ query: searchQuery.query, id: id });
  };

  const loadMoreResults = async () => {
    if (resultsData.areItemsCompleted) {
      console.warn(
        "The search results are fully displayed and there is nothing more to add"
      );
      return;
    }

    changeAppState({
      status: "busy",
      message: "Adding more results",
      shouldGiveUserConsent: true,
    });

    const currentDataSize = resultsData.query.length;
    const results = await getRequest(
      "pokemon",
      queryResults.results.slice(currentDataSize, currentDataSize + pageSize)
    );

    setResultsData((prevState) => ({
      ...prevState,
      query: [...prevState.query, ...results],
      areQueryResultsCompleted:
        currentDataSize + results.length >= queryResults.results.length,
    }));

    changeAppState({ status: "ready" });
  };

  //
  // useEffects & data requests
  //

  useEffect(() => {
    const requestAndFindQueryResults = async () => {
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

    requestAndFindQueryResults();
  }, [searchQuery.query]);

  useEffect(() => {
    const requestAndUpdateQueryData = async () => {
      let results;

      if (queryResults.haveResults) {
        changeAppState({
          status: "waiting",
          message: "Fetching search results...",
        });

        results = await getRequest(
          "pokemon",
          queryResults.results.slice(0, pageSize)
        );

        changeAppState({ status: "ready" });
      }

      setResultsData((prevState) => ({
        ...prevState,
        query: results ? results : null,
        areQueryResultsCompleted: results
          ? results.length >= queryResults.results.length
          : true,
      }));
    };

    requestAndUpdateQueryData();
  }, [queryResults.query]);

  useEffect(() => {
    const setNewIDResults = (results) => {
      setResultsData((prevState) => ({
        ...prevState,
        id: results,
      }));
    };
    const requestAndUpdateIDData = async () => {
      let results;
      results = (await getRequest("pokemon-species", [searchQuery.id]))[0];

      setNewIDResults(results ? results : null);
    };

    if (searchQuery.id) {
      requestAndUpdateIDData();
    } else {
      if (resultsData.id) {
        setNewIDResults(null);
      }
    }
  }, [searchQuery.id]);

  console.log("results render");

  //
  //
  //

  //
  //
  //

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        className="mb-4"
      />
      <main>
        <section className={className}>
          {searchQuery.query ? (
            queryResults.haveResults ? (
              <>
                {resultsData.query && searchQuery.id && (
                  <div className="lg:w-10/12 lg:mx-auto mb-24">
                    <PokemonBox
                      pokemon={resultsData.query[selectedIndex]}
                      pokemonSpecies={resultsData.id}
                      onClose={setID}
                      shouldScroll={true}
                    />
                  </div>
                )}
                <ul className="flex flex-wrap">
                  {resultsData.query &&
                    resultsData.query.map((pokemon, index) => (
                      <React.Fragment key={`pokemon-${index}`}>
                        {selectedIndex !== index && (
                          <li
                            id={
                              selectedIndex === index ? "selected-result" : null
                            }
                            className="basis-full sm:basis-6/12 mb-8"
                          >
                            <article>
                              <PokemonItem
                                pokemon={pokemon}
                                index={index}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                onClick={setID}
                              />
                            </article>
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  {!resultsData.areQueryResultsCompleted && (
                    <button onClick={loadMoreResults}>See More</button>
                  )}
                </ul>
              </>
            ) : searchState === "ready" ? (
              <div className="g-message"></div>
            ) : (
              <span> Loading </span>
            )
          ) : (
            "No search has been made yet"
          )}
        </section>
      </main>
    </>
  );
};
