export const ModalGenerationLabel = ({
  generation,
  setSelectedValues,
  className = "",
}) => {
  const handleClick = () => {
    setSelectedValues(generation);
  };
  return (
    <li onClick={handleClick} className={`list-none mb-2 ${className}`}>
      {`Generation ${generation}`}
    </li>
  );
};
