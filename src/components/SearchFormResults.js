import React, { useState, useEffect } from "react";
import {
  fetchAllPokemonOfType,
  extractPokemonIDsFromList,
  fetchPokemonFromID,
  fetchPokemonSpeciesFromID,
} from "../helpers/ApiHandlers";
import {
  checkTypeIndex,
  getDeconstructedSearch,
} from "../helpers/MatchHandlers";
import PokemonBox from "./PokemonBox";
import PokemonItem from "./PokemonItem";
import { usePokemonDataContext } from "./PokemonContext";
import { Link } from "react-router-dom";

const SearchFormResults = ({ searchQuery, setSearchQuery }) => {
  const [searchResults, setSearchResults] = useState({
    query: null,
    haveResults: false,
    items: [],
  });
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null);
  const [searchState, setSearchState] = useState("ready");
  const pokemonData = usePokemonDataContext();
  const pendingTimeLimit = 7000;

  let selectedIndex = null;
  if (searchResults.haveResults) {
    searchResults.items.forEach((pokemon, index) => {
      if (searchQuery.id == pokemon.id) selectedIndex = index;
    });
  }

  const pushNextPageResults = async () => {
    try {
      setSearchState("busy");
      /*
      const newSearchResults = await getCharacterResults(
        searchResults.nextUrl,
        pendingTimeLimit
      );
      newSearchResults.items = [
        ...searchResults.items,
        ...newSearchResults.items,
      ];
      setSearchResults({ ...searchResults, ...newSearchResults });
      */
      setSearchState("ready");
    } catch (error) {
      setSearchState("error");
      console.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("results loaded");

      if (searchQuery.query) {
        try {
          setSearchState("busy");
          let listsOfPokemon = new Array();
          const deconstructedQuery = getDeconstructedSearch(searchQuery.query);

          for (let i = 0; i < deconstructedQuery.length; i++) {
            switch (deconstructedQuery[i].category) {
              case "type":
                const typeIndex = checkTypeIndex(
                  pokemonData.typeList,
                  deconstructedQuery[i].match
                );
                listsOfPokemon.push(
                  await fetchAllPokemonOfType(typeIndex, pendingTimeLimit)
                );
                break;

              default:
                break;
            }
          }

          let listsOfPokemonIDs = new Array();
          listsOfPokemon.forEach((list) => {
            listsOfPokemonIDs.push(extractPokemonIDsFromList(list.pokemon));
          });

          let pokemonIDs = new Array();
          if (listsOfPokemonIDs.length > 1) {
            for (let i = 0; i < listsOfPokemonIDs.length - 1; i++) {
              let matchedPokemonIDs = new Array();
              listsOfPokemonIDs[i + 1].forEach((id) => {
                if (listsOfPokemonIDs[0].includes(id)) {
                  matchedPokemonIDs.push(id);
                }
              });
              listsOfPokemonIDs[0] = matchedPokemonIDs;
            }
          }
          pokemonIDs = listsOfPokemonIDs[0];

          let pokemonResults = new Array();
          for (let i = 0; i < Math.min(pokemonIDs.length, 10); i++) {
            const id = pokemonIDs[i];
            pokemonResults.push(await fetchPokemonFromID(id, pendingTimeLimit));
          }

          setSearchResults({
            query: searchQuery.query,
            haveResults: pokemonResults.length === 0 ? false : true,
            items: pokemonResults,
          });
          setSearchState("ready");
        } catch (error) {
          setSearchState("error");
          console.error(error.message);
        }
      }
    };
    fetchData();
  }, [searchQuery.query]);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.id) {
        try {
          setSearchState("busy");

          setPokemonSpeciesData(
            await fetchPokemonSpeciesFromID(searchQuery.id, pendingTimeLimit)
          );

          setSearchState("ready");
        } catch (error) {
          setSearchState("error");
          console.error(error.message);
        }
      }
    };
    fetchData();
  }, [searchQuery.id]);

  /*
  useEffect(async () => {
    if (searchQuery.character) {
      try {
        setEpisodeList(
          await getRickAndMortyEpisodes(
            getEpisodeNumber(searchResults.items[selectedIndex].episode)
          )
        );
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [searchQuery.character]);
  */

  return (
    <section className="mx-4 md:mx-8 lg:mx-32">
      {searchQuery.query ? (
        searchResults.haveResults ? (
          <>
            {searchQuery.id && (
              <div className="lg:w-10/12 lg:mx-auto mb-24">
                <PokemonBox
                  pokemon={searchResults.items[selectedIndex]}
                  pokemonSpecies={
                    searchState === "ready" ? pokemonSpeciesData : null
                  }
                />
              </div>
            )}
            <ul className="flex flex-wrap">
              {searchResults.items.map((pokemon, index) => (
                <React.Fragment key={`pokemon-${index}`}>
                  {selectedIndex != index && (
                    <li
                      id={selectedIndex == index ? "selected-result" : null}
                      className="md:basis-6/12 mb-12"
                    >
                      <Link to={`/?q=${searchQuery.query}&id=${pokemon.id}`}>
                        <article>
                          <PokemonItem
                            pokemon={pokemon}
                            index={index}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                          />
                        </article>
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
              {searchResults.nextUrl && (
                <button onClick={pushNextPageResults}>See More</button>
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
  );
};

export default SearchFormResults;
