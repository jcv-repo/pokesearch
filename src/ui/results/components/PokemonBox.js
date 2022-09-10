// React
import { useEffect, useRef } from "react";
// Components
import { PokemonTypeLabel } from "#components/pokemon/type";
// Utils
import { getPokedexIndexFromPokemon } from "#data/api/utils/getPokedexIndexFromPokemon";
import { getGenderLabel } from "./utils/getGenderLabel";
import { getFlavorText } from "./utils/getFlavorText";
import { toTitleCase } from "#utils/toTitleCase";

export const PokemonBox = ({
  pokemon = {},
  pokemonSpecies = {},
  setIdCallback = () => {},
  shouldScroll = false,
}) => {
  const boxElement = useRef(null);
  const isPokemonLoaded = pokemon.name !== undefined; // idk
  const isPokemonSpeciesLoaded = pokemonSpecies.name !== undefined; // idk rrly

  const language = "en";
  const pokedexIndex = isPokemonLoaded
    ? `#${("000" + getPokedexIndexFromPokemon(pokemon)).slice(-3)}`
    : "";

  const closeBox = () => {
    setIdCallback();
  };

  const escKeyCallback = (event) => {
    if (event.key === "Escape") {
      closeBox();
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", escKeyCallback);
    return () => {
      document.removeEventListener("keyup", escKeyCallback);
    };
  }, []);

  useEffect(() => {
    if (shouldScroll) {
      boxElement.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pokemon.id]);

  return (
    <div className="sm:flex sm:items-start xl:items-start xl:justify-end sm:overflow-y-scroll xl:fixed xl:top-0 sm:w-1/2 lg:w-1/3 xl:w-[1180px] sm:h-full pt-4 xl:pt-24 mb-8 sm:ml-4 lg:ml-0 sm:mb-0 xl:mx-auto">
      <div className="xl:w-1/3 lg:pl-2">
        <div
          ref={boxElement}
          aria-label={`${pokemon.name}'s biography`}
          tabIndex="0"
          className="relative flex flex-col p-4 rounded-2xl bg-tertiary-one"
        >
          <button
            id="close-charbox"
            onClick={closeBox}
            className="absolute flex items-center justify-center top-12 right-12 z-10 w-8 h-8 rounded-full bg-tertiary-one"
          >
            <svg viewBox="0 0 20 20" className="w-6 h-6 fill-secondary-two">
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </button>
          {isPokemonLoaded && (
            <>
              <div
                className="w-full p-4 bg-gradient-to-b 
  from-secondary-one to-secondary-two dark:from-dark-secondary-one dark:to-dark-secondary-two rounded-2xl"
              >
                <div className="relative w-full h-full max-h-[40vh] before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
                  <img
                    src={
                      pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={`An official artwork of ${pokemon.name}`}
                    className="w-auto max-h-[inherit] h-full py-4 mx-auto"
                  />
                </div>
              </div>
              <div className="px-4 mt-4">
                <header>
                  <h2 className="text-4xl font mb-1">
                    {toTitleCase(pokemon.name)}
                    <span className="inline-block align-middle ml-2 text-base">
                      {pokedexIndex}
                    </span>
                  </h2>
                </header>

                <ul>
                  <li className="flex items-center mb-4">
                    <div className="mr-2">Type</div>
                    {pokemon.types.map(({ type }, index) => (
                      <div
                        className="mr-2"
                        key={`${pokemon.name}-type-${type.name}`}
                      >
                        <PokemonTypeLabel value={type.name} />
                      </div>
                    ))}
                  </li>
                  {isPokemonSpeciesLoaded ? (
                    <>
                      <li className="mb-4">
                        <p>
                          {getFlavorText(
                            pokemonSpecies.flavor_text_entries,
                            language
                          )}
                        </p>
                      </li>
                    </>
                  ) : (
                    <span>loading...</span>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
