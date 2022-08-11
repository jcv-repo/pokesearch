import { PokemonTypeLabel } from "#components/pokemon/type";
import { toTitleCase } from "#utils/toTitleCase";

export const PokemonItem = ({ pokemon, onClick }) => {
  const callback = () => {
    onClick(pokemon.id);
  };
  const titleID = `pokemon-name-${pokemon.name}`;

  return (
    <button
      className="flex items-center space-x-6 md:space-x-8 text-left"
      onClick={callback}
      aria-labelledby={titleID}
    >
      <div
        className="flex content-center items-center justify-center w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-b 
  from-primary-one to-primary-two rounded-2xl"
      >
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
          <img
            src={pokemon.sprites.front_default}
            alt={`A sprite of ${pokemon.name}`}
          />
        </div>
      </div>

      <div>
        <h3 className="text-2xl md:text-4xl font mb-1" id={titleID}>
          {toTitleCase(pokemon.name)}
          <span className="inline-block align-middle ml-2 text-base">
            #{pokemon.id}
          </span>
        </h3>

        <div className="flex sm:flex-wrap lg:flex-nowrap items-center">
          <div className="mr-2 sm:w-full sm:mr-0 lg:w-auto lg:mr-2">Type</div>
          {pokemon.types.map((type, index) => (
            <div className="mr-2" key={`type-${index}`}>
              <PokemonTypeLabel value={type.type.name} />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
};
