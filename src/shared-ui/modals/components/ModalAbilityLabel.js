import { toTitleCase } from "#utils/toTitleCase";

export const ModalAbilityLabel = ({
  ability,
  setSelectedValues,
  className = "",
}) => {
  const handleClick = () => {
    setSelectedValues(ability);
  };
  return (
    <li key={`ability-${ability}`} className={className}>
      <button onClick={handleClick}>
        {toTitleCase(ability).replaceAll("-", " ")}
      </button>
    </li>
  );
};
