import toTitleCase from "../helpers/toTitleCase";
import PokemonTypeLabel from "./PokemonTypeLabel";

const PokemonItem = ({ pokemon, index, searchQuery, setSearchQuery }) => {
  const setSelectedChar = () => {
    setSearchQuery({ ...searchQuery, pokemon: pokemon.id });
  };

  return (
    <div className="flex items-center" onClick={setSelectedChar}>
      <div
        className="flex content-center items-center justify-center w-32 h-32 mr-10 bg-gradient-to-b 
  from-primary-one to-primary-two rounded-2xl"
      >
        <div className="relative w-24 h-24 before:block before:absolute before:w-full before:h-full before:border-4 before:border-white before:border-solid before:rounded-2xl">
          <img
            src={pokemon.sprites.front_default}
            alt={`A sprite of ${pokemon.name}`}
          />
        </div>
      </div>

      <div>
        <h3 className="text-4xl font mb-1">
          {toTitleCase(pokemon.name)}
          <span className="inline-block align-middle ml-2 text-base">
            #{pokemon.id}
          </span>
        </h3>

        <div className="flex items-center">
          <div className="mr-2">Type</div>
          {pokemon.types.map((type, index) => (
            <div className="mr-2" key={`type-${index}`}>
              <PokemonTypeLabel value={type.type.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonItem;
