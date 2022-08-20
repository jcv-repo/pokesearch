import { toTitleCase } from "#utils/toTitleCase";

export const PokemonTypeLabel = ({ value: type, id = "", className = "" }) => (
  <div
    id={id}
    className={`${className} w-20 md:w-24 py-0.5 rounded-full bg-type-${type} text-center text-white 
    text-base md:text-xl font-roboto-condensed font-bold text-shadow`}
  >
    {toTitleCase(type)}
  </div>
);
