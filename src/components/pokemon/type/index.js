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
      isDisabled
        ? `bg-slate-200 text-on-tertiary`
        : `bg-type-${type} text-white text-shadow font-bold`
    } text-center 
    text-base md:text-xl font-roboto-condensed select-none`}
  >
    {toTitleCase(type)}
  </div>
);
