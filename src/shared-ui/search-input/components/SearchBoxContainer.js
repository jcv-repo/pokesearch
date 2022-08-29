import { useEffect, useRef } from "react";
// Components
import { Combobox } from "./Combobox";
import { AddButton } from "./AddButton";

export const SearchBoxContainer = ({
  config,
  categoryData,
  userInput,
  setInput,
  setSelection,
  setModal,
  isReady,
  className = "",
}) => {
  //
  //
  //

  //
  //
  //

  //
  //
  //

  return (
    <div className={`relative z-10 flex grow rounded-lg ${className}`}>
      <AddButton
        options={config.addMenu}
        callback={setModal}
        isLoading={!isReady}
        className="relative"
      />
      <Combobox
        data={isReady ? categoryData.current : null}
        options={config.categories}
        inputValue={userInput.input}
        inputCallback={setInput}
        selectedValues={userInput.selected}
        selectedCallback={setSelection}
        isLoading={!isReady}
        maxSuggestionCount={config.maxSuggestionCount}
        placeholder={config.placeholderMessage}
        loadingMessage={config.loadingMessage}
        noMatchesMessage={config.noMatchesMessage}
        className="w-full"
      />
    </div>
  );
};
