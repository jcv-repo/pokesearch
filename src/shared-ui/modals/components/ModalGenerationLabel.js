export const ModalGenerationLabel = ({ generation, setSelectedValues }) => {
  const handleClick = () => {
    setSelectedValues(generation);
  };
  return (
    <li
      onClick={handleClick}
      className="flex grow-0 shrink-0 basis-4/12 content-center justify-center list-none mb-2"
    >
      {generation}
    </li>
  );
};
