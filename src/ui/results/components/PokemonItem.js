import { PokemonTypeLabel } from "#components/pokemon/type";
import { toTitleCase } from "#utils/toTitleCase";
import { getPokedexIndexFromPokemon } from "#data/api/utils/getPokedexIndexFromPokemon";
import missingSprite from "#assets/images/missingno.png";

export const PokemonItem = ({ pokemon = {}, active = false, onClick }) => {
  const callback = () => {
    onClick(pokemon.name);
  };

  const isPokemonLoaded = pokemon && pokemon.name !== undefined;
  let pokemonName, pokemonSprite, titleID, pokedexIndex;

  if (isPokemonLoaded) {
    pokemonName = toTitleCase(pokemon.name).replaceAll("-", " ");
    pokemonSprite = pokemon.sprites.front_default || missingSprite;
    titleID = `pokemon-name-${pokemon.name}`;
    pokedexIndex = `#${("000" + getPokedexIndexFromPokemon(pokemon)).slice(
      -3
    )}`;
  }

  return (
    <button
      onClick={callback}
      role="link"
      aria-labelledby={titleID}
      className={`relative flex items-center w-full p-2 rounded-2xl text-left bg-tertiary-one ${
        active &&
        "before:block before:absolute before:left-0 before:w-full before:h-full before:border-4 before:border-secondary-two before:rounded-2xl"
      }`}
    >
      <div
        className={`flex content-center items-center justify-center w-24 h-24 mr-4 rounded-xl ${
          isPokemonLoaded
            ? "bg-gradient-to-b from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two"
            : "bg-slate-200"
        }`}
      >
        <div className="relative flex content-center items-center justify-center w-full h-full sm:w-24 sm:h-24">
          {isPokemonLoaded && (
            <img
              src={pokemonSprite}
              alt={`A sprite of ${pokemon.name}`}
              className="inline-block"
            />
          )}
        </div>
      </div>

      <div>
        {isPokemonLoaded ? (
          <>
            <h3 className="text-2xl mb-1" id={titleID}>
              <div className="text-xs">{pokedexIndex}</div>
              {pokemonName}
            </h3>

            <div className="flex sm:flex-wrap lg:flex-nowrap items-center">
              {pokemon.types.map(({ type }, index) => (
                <div className="mr-2" key={`type-${index}`}>
                  <PokemonTypeLabel value={type.name} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col">
            <div className="w-40 h-3 mt-3 mb-5 rounded-full bg-slate-200"></div>
            <div className="flex items-center ">
              <div className="w-8 h-3 m-0.5 rounded-full mr-2 bg-slate-200"></div>
              <div className="w-24 h-8 rounded-full bg-slate-200"></div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
