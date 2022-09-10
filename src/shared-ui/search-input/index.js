// React
import { useState, useRef, useEffect } from "react";
// Contexts
import { useAppContext } from "#app/context";
import { usePokemonDataContext } from "#data/context";
// Components
import { SearchBoxContainer } from "./components/SearchBoxContainer";
import { SearchButton } from "./components/SearchButton";
import { Button } from "#components/button";
import { Combobox } from "./components/Combobox";
import { AddButton } from "./components/AddButton";
import { SearchIcon } from "./components/SearchIcon";
// Hooks
import { useModal } from "#components/modal/useModal";
// Utils & helpers
import { translateQueryToSelection } from "./utils/translateQueryToSelection";
import { getStateErrorMessageWithStatus } from "#app/helpers/getStateErrorMessageWithStatus";
import { extractDataListLabels } from "#data/api/utils/extractDataListLabels";
// Config
import { config } from "./config";

//
//
//

export const SearchInput = ({
  searchQuery,
  setSearchQuery,
  direction,
  showButtonMessage = true,
  showButtonIcon = false,
  className = "",
}) => {
  //
  // useState declarions
  //

  const [userInput, setUserInput] = useState({
    input: "",
    selected: {},
  });

  const [isReady, setIsReady] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const { modalIsOpen, toggleModal } = useModal();

  const { changeAppState } = useAppContext();

  //
  // Other variables
  //

  const Modal = config.addMenu[selectedModal]?.dialog;
  const categoryData = useRef({ isLoaded: false });
  const requestPokemonData = usePokemonDataContext();

  //
  // Utils
  //

  const setInput = (input) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      input: input,
    }));
  };

  const setSelection = (selection, shouldPreservePreviousValues = true) => {
    const newSelection = shouldPreservePreviousValues
      ? { ...userInput.selected, ...selection }
      : selection;

    Object.keys(newSelection).forEach((category) => {
      if (newSelection[category] === null) {
        delete newSelection[category];
      }
    });

    //
    // Uncomment when needed
    //
    // if (!isSelectionValid(newSelection, config.categories, true)) {
    //   throw new Error();
    // }
    //

    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      selected: newSelection,
    }));
  };

  const getRequest = async (category, params) => {
    const request = params
      ? await requestPokemonData(category, params)
      : await requestPokemonData(category);
    if (!request.ok) {
      changeAppState({
        status: "error",
        message: getStateErrorMessageWithStatus(request.status),
      });

      throw new Error(request.message);
    }
    return request.results;
  };

  //
  // Callbacks
  //

  const doQuery = () => {
    setSearchQuery({
      query: Object.keys(userInput.selected)
        .reduce(
          (queryAcum, category) =>
            `${queryAcum}${userInput.selected[category].reduce(
              (categoryAcum, value) => `${categoryAcum}${category}:${value}+`,
              ""
            )}`,
          ""
        )
        .slice(0, -1),
    });
  };

  const setModal = (category) => {
    const index = config.addMenu.findIndex(
      ({ category: optionCategory }) => optionCategory === category
    );
    if (index === -1) {
      return;
    }
    setSelectedModal(index);
    toggleModal(true);
  };

  //
  // useEffects & data requests
  //

  useEffect(() => {
    if (searchQuery.query && searchQuery.query !== userInput.input) {
      setSelection(translateQueryToSelection(searchQuery.query), false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const requestAndUpdateData = async () => {
      let data = { isLoaded: true };

      for (const category of config.categories) {
        const request = await getRequest(category.name);

        data = {
          ...data,
          [category.name]: extractDataListLabels(request, category.name),
        };
      }
      categoryData.current = { isLoaded: true, ...data };
      setIsReady(true);
    };

    requestAndUpdateData();
  }, []);

  //
  //
  //

  //
  //
  //

  return (
    <div role="search" className={className}>
      {selectedModal !== null && (
        <>
          <Modal
            isOpen={modalIsOpen}
            toggle={toggleModal}
            initialValue={
              userInput.selected[config.addMenu[selectedModal].category] || null
            }
            callback={setSelection}
            dataList={
              categoryData.current[config.addMenu[selectedModal].category]
            }
          />
        </>
      )}

      <div
        className={
          direction === "column"
            ? "flex flex-col justify-center content-center"
            : direction === "row" &&
              "flex flex-row justify-center content-center grow-0 shrink-0"
        }
      >
        <div className="relative z-10 flex grow sm:w-4/5 rounded-lg">
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
          <SearchIcon onClick={doQuery} className="" />
        </div>

        {/* <div
          className={`${
            direction === "column"
              ? "inline-block text-center mt-4"
              : direction === "row" && "flex items-center sm:w-1/5"
          }`}
        >
          <Button
            message={showButtonMessage && "Search"}
            onClick={doQuery}
            IconComponent={SearchIcon}
            className="bg-gradient-to-l from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two"
          />
        </div> */}
      </div>
    </div>
  );
};
