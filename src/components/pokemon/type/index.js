import { toTitleCase } from "#utils/toTitleCase";

export const PokemonTypeLabel = ({
  value: type,
  id = "",
  isDisabled = false,
  className = "",
}) => (
  <div
    id={id}
    className={`${className} w-20 md:w-24 py-0.5 rounded-full ${
      isDisabled ? `bg-slate-400` : `bg-type-${type}`
    } text-center text-white 
    text-base md:text-xl font-roboto-condensed font-bold text-shadow select-none`}
  >
    {toTitleCase(type)}
  </div>
);
