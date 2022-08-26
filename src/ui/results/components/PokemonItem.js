import { PokemonTypeLabel } from "#components/pokemon/type";
import { toTitleCase } from "#utils/toTitleCase";
import missingSprite from "#assets/images/missingno.png";

export const PokemonItem = ({ pokemon = {}, onClick }) => {
  const callback = () => {
    onClick(pokemon.name);
  };

  const isPokemonLoaded = pokemon && pokemon.name !== undefined;
  let pokemonName, pokemonSprite, titleID;

  if (isPokemonLoaded) {
    pokemonName = toTitleCase(pokemon.name).replaceAll("-", " ");
    pokemonSprite = pokemon.sprites.front_default || missingSprite;
    titleID = `pokemon-name-${pokemon.name}`;
  }

  return (
    <button
      onClick={callback}
      role="link"
      aria-labelledby={titleID}
      className="flex items-center w-full 2space-x-6 md:space-x-8 text-left"
    >
      <div
        className={`flex content-center items-center justify-center w-20 h-20 sm:w-32 sm:h-32 rounded-2xl ${
          isPokemonLoaded
            ? "bg-gradient-to-b from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two"
            : "bg-slate-200"
        }`}
      >
        <div className="relative flex content-center items-center justify-center w-16 h-16 sm:w-24 sm:h-24 before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
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
            <h3 className="text-2xl md:text-4xl font mb-1" id={titleID}>
              {pokemonName}
              <span className="inline-block align-middle ml-2 text-base">
                #{pokemon.id}
              </span>
            </h3>

            <div className="flex sm:flex-wrap lg:flex-nowrap items-center">
              <div className="mr-2 sm:w-full sm:mr-0 lg:w-auto lg:mr-2">
                Type
              </div>
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
