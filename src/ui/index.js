// React
import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
// Components
import { Home } from "./home";
import { SearchResults } from "./results";
// Helpers
import { getUrlParams, getNewParamsString } from "#utils/urlParams";

//
//
//

export const SearchForm = () => {
  const getQueryParams = () => {
    const { q, id } = getUrlParams() || {};
    return {
      query: q || null,
      id: id || null,
    };
  };

  const [searchQuery, updateSearchQuery] = useState(getQueryParams());

  //
  // TODO
  // Deconstruct location and use what you really need for useeffect
  //

  const location = useLocation();
  const history = useHistory();

  const setSearchQuery = (newQuery, shouldPushUrl = true) => {
    if (shouldPushUrl) {
      history.push({
        search: getNewParamsString(
          { q: newQuery.query, id: newQuery.id },
          true
        ),
      });
    }

    updateSearchQuery(newQuery);
  };

  useEffect(() => {
    const params = getQueryParams();
    if (params.query != searchQuery.query || params.id != searchQuery.id) {
      setSearchQuery(params, false);
    }
  }, [location]);

  //
  //
  //

  //
  //
  //

  return (
    <div id="container" className="min-h-full">
      {!searchQuery.query ? (
        <Home
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="flex flex-col justify-center content-center h-screen mx-4"
        />
      ) : (
        <SearchResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          className="mt-8 mx-4 md:mx-8 lg:mx-32"
        />
      )}
    </div>
  );
};
