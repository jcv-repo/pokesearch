export const ModalAbilityLabel = ({
  ability,
  setSelectedValues,
  className = "",
}) => {
  const handleClick = () => {
    setSelectedValues(ability);
  };
  return (
    <li key={`ability-${ability}`} onClick={handleClick} className={className}>
      {ability}
    </li>
  );
};
