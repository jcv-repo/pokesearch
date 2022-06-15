import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePokemonDataContext } from "./PokemonContext";
import SearchFormHome from "./SearchFormHome";
import SearchFormHeader from "./SearchFormHeader";
import SearchFormResults from "./SearchFormResults";
import { getUrlParams } from "../helpers/GetUrlParams";
import "../styles/search.css";

const SearchForm = () => {
  const params = getUrlParams() || {};
  const getStateFromParams = () => ({
    query: params.q || null,
    id: params.id || null,
  });
  const [searchQuery, setSearchQuery] = useState(getStateFromParams());
  const pokemonData = usePokemonDataContext();
  const location = useLocation();

  // const firstUpdate = useRef(true);

  useEffect(() => {
    if (params.q != searchQuery.query || params.id != searchQuery.id) {
      setSearchQuery(getStateFromParams());
    }
  }, [location]);

  //useEffect(() => {
  //  console.log(pokemonData);
  //});

  return (
    <div id="container" className="min-h-full">
      {!searchQuery.query ? (
        <>
          <SearchFormHome
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="flex flex-col justify-center content-center h-screen"
          />
        </>
      ) : (
        <>
          <SearchFormHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            className="mb-4"
          />
          {pokemonData !== null && (
            <main>
              <SearchFormResults
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              ></SearchFormResults>
            </main>
          )}
        </>
      )}
    </div>
  );
};

export default SearchForm;
