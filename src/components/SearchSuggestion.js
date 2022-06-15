import toTitleCase from "../helpers/toTitleCase";

const SearchSuggestion = ({
  index,
  suggestion,
  userInput,
  addToUserInput,
  suggestionFocus,
}) => {
  const suggestionString = `${suggestion.category}:${suggestion.match}`;
  const addSuggestion = () => {
    addToUserInput(suggestionString);
  };

  return (
    <li
      data-input-suggestion={suggestionString}
      onClick={addSuggestion}
      className="pb-2"
    >
      <span className="pr-2 text-neutral-500">
        {toTitleCase(suggestion.category)}
      </span>
      <span>{toTitleCase(suggestion.match)}</span>
    </li>
  );
};

export default SearchSuggestion;
