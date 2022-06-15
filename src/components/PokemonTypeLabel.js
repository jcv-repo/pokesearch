import toTitleCase from "../helpers/toTitleCase";

const PokemonTypeLabel = ({ value: type, className }) => (
  <div
    className={`${className} w-24 py-0.5 rounded-full bg-black text-center text-white 
    bg-type-${type} text-xl font-roboto-condensed font-bold text-shadow`}
  >
    {toTitleCase(type)}
  </div>
);

export default PokemonTypeLabel;
