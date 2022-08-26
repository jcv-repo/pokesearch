// React
import { useEffect, useRef } from "react";
// Components
import { PokemonTypeLabel } from "#components/pokemon/type";
// Utils
import { getGenderLabel } from "./utils/getGenderLabel";
import { getFlavorText } from "./utils/getFlavorText";
import { toTitleCase } from "#utils/toTitleCase";

export const PokemonBox = ({
  pokemon = {},
  pokemonSpecies = {},
  onClose = () => {},
  shouldScroll = false,
  className = "",
}) => {
  const boxElement = useRef(null);
  const isPokemonLoaded = pokemon.name !== undefined; // idk
  const isPokemonSpeciesLoaded = pokemonSpecies.name !== undefined; // idk rrly

  const language = "en";

  const escKeyCallback = (event) => {
    if (event.key === "Escape") {
      onClose();
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
    <div className={className}>
      <div
        ref={boxElement}
        aria-label={`${pokemon.name}'s biography`}
        tabIndex="0"
        className="flex flex-col sm:flex-row"
      >
        <div id="close-charbox" onClick={onClose}></div>
        {isPokemonLoaded && (
          <>
            <div
              className="w-full p-4 h-96 mr-10 sm:grow-0 sm:shrink-0 sm:basis-60  md:basis-80 bg-gradient-to-b 
  from-secondary-one to-secondary-two dark:from-dark-secondary-one dark:to-dark-secondary-two rounded-2xl"
            >
              <div className="flex content-center items-center justify-center relative w-full h-full before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={`An official artwork of ${pokemon.name}`}
                  className="w-auto max-h-full sm:h-auto p-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <header>
                <h2 className="text-4xl font mb-1">
                  {toTitleCase(pokemon.name)}
                  <span className="inline-block align-middle ml-2 text-base">
                    #{pokemon.id}
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
                    <li>
                      <p>{getGenderLabel(pokemonSpecies.gender_rate)}</p>
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
  );
};
