import React, { useRef, useEffect } from "react";
import { PokemonItem } from "./PokemonItem";

export const ListOfPokemon = ({
  queryResults,
  pokemonData,
  availableQuery,
  isLoadingPokemon,
  areQueryResultsCompleted,
  queryId,
  setIdCallback,
  pageSize,
  loadMoreCallback,
  loadMoreMessage,
  shouldInfiniteScroll,
  className = "",
}) => {
  const loadMoreElement = useRef(null);
  const resultsDataTargetSize = isLoadingPokemon
    ? availableQuery.length + pageSize
    : availableQuery.length;

  const handleScroll = () => {
    window.requestAnimationFrame(() => {
      if (isLoadingPokemon.pokemon || !loadMoreElement.current) {
        return;
      }
      const { top, bottom } = loadMoreElement.current.getBoundingClientRect();
      const height = loadMoreElement.current.offsetHeight;

      const isVisible =
        top + height >= 0 &&
        bottom - height <=
          (window.innerHeight || document.documentElement.clientHeight);

      if (isVisible) {
        loadMoreCallback();
      }
    });
  };

  useEffect(() => {
    if (shouldInfiniteScroll) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [pokemonData]);

  return (
    <div className={className}>
      <ul className="flex flex-wrap" aria-label="Search results" tabIndex="0">
        {queryResults.slice(0, resultsDataTargetSize).map((pokemon, index) => {
          const isTheSameAsId = queryId === pokemon;
          const shouldDisplayData = isLoadingPokemon
            ? availableQuery.length > index
            : true;
          const data = pokemonData[pokemon];

          return (
            <React.Fragment key={`pokemon-item-${pokemon}`}>
              {!isTheSameAsId && (
                <li className="basis-full sm:basis-6/12 mb-8">
                  <article>
                    <PokemonItem pokemon={data} onClick={setIdCallback} />
                  </article>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
      {!areQueryResultsCompleted && !isLoadingPokemon && (
        <button
          onClick={loadMoreCallback}
          ref={loadMoreElement}
          className="block px-6 py-2 mx-auto rounded-full bg-gradient-to-l 
        from-secondary-two to-secondary-one text-on-secondary dark:from-dark-secondary-two dark:to-dark-secondary-one dark:text-dark-on-secondary font-roboto-condensed font-bold leading-4"
        >
          {loadMoreMessage}
        </button>
      )}
    </div>
  );
};
