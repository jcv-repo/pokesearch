import React, { useRef, useEffect } from "react";
import { PokemonItem } from "./PokemonItem";
import { matchArrays } from "#utils/matchArrays";

export const ListOfPokemon = ({
  queryResults,
  pokemonData,
  availableQuery,
  currentPage,
  isLoadingPokemon,
  areQueryResultsCompleted,
  queryId,
  setIdCallback,
  pageSize,
  loadMoreCallback,
  loadMoreMessage,
  shouldInfiniteScroll,
}) => {
  //
  // Refs & constants
  //

  const loadMoreElement = useRef(null);
  const resultsDataTargetSize = isLoadingPokemon
    ? currentPage * pageSize + pageSize
    : currentPage * pageSize;
  const containerElement = useRef(null);

  //
  // Callbacks
  //

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

  //
  // useEffects
  //

  useEffect(() => {
    if (shouldInfiniteScroll) {
      window.addEventListener("scroll", handleScroll);
      if (containerElement.current !== null) {
        containerElement.current.addEventListener("scroll", handleScroll);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (containerElement.current !== null) {
        containerElement.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [pokemonData]);

  //
  //
  //

  //
  //
  //

  return (
    <div
      className={`${
        queryId ? "sm:w-1/2" : "lg:overflow-y-visible"
      } sm:overflow-y-scroll xl:overflow-y-visible xl:relative xl:z-10 lg:w-2/3 lg:pr-2`}
      ref={containerElement}
    >
      <ul
        className="flex flex-wrap first:mt-4"
        aria-label="Search results"
        tabIndex="0"
      >
        {queryResults.slice(0, resultsDataTargetSize).map((pokemon, index) => {
          const isTheSameAsId = queryId === pokemon;
          const shouldDisplayData = isLoadingPokemon
            ? availableQuery.length > index
            : true;
          const data = pokemonData[pokemon];
          const keyName = `pokemon-item-${pokemon}`;

          return (
            <li
              key={keyName}
              className={`${
                queryId ? "" : "sm:basis-1/2 sm:odd:pr-2 sm:even:pl-2"
              } basis-full lg:basis-1/2 lg:odd:pr-2 lg:even:pl-2 mb-4`}
            >
              <article>
                <PokemonItem
                  pokemon={data}
                  active={isTheSameAsId}
                  onClick={setIdCallback}
                />
              </article>
            </li>
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
