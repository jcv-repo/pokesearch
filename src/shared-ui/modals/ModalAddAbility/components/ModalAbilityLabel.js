import { toTitleCase } from "#utils/toTitleCase";

export const ModalAbilityLabel = ({
  ability,
  isSelected,
  setSelectedValues,
  elementRef,
  shouldScroll,
  className = "",
}) => {
  const handleClick = () => {
    shouldScroll.current = false;
    setSelectedValues(ability);
  };

  return (
    <li
      key={`ability-${ability}`}
      className={`${
        isSelected && "rounded-full bg-secondary-two text-on-secondary"
      } ${className}`}
      ref={elementRef !== null ? elementRef : null}
    >
      <button onClick={handleClick} className={"pl-2"}>
        {toTitleCase(ability).replaceAll("-", " ")}
      </button>
    </li>
  );
};
