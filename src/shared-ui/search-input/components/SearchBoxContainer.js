import { useEffect, useRef } from "react";
// Components
import { Button } from "#components/button";
import { Combobox } from "./Combobox";
import { AddButton } from "./AddButton";
import { ReactComponent as SearchIcon } from "#assets/images/search_icon.svg";

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
      <div className={`flex items-center sm:w-1/5`}>
        <Button
          IconComponent={SearchIcon}
          className="bg-gradient-to-l from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two"
        />
      </div>
    </div>
  );
};
