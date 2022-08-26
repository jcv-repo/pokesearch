// React
import { useState, useRef, useEffect } from "react";
// Contexts
import { useAppContext } from "#app/context";
import { usePokemonDataContext } from "#data/context";
// Components
import { SearchBoxContainer } from "./components/SearchBoxContainer";
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
              "flex flex-row justify-center content-center grow-0 shrink-0 mx-4 sm:mx-0"
        }
      >
        <SearchBoxContainer
          config={config}
          categoryData={categoryData}
          userInput={userInput}
          setInput={setInput}
          setSelection={setSelection}
          setModal={setModal}
          isReady={isReady}
        />
        <div
          className={`${
            direction === "column"
              ? "inline-block text-center mt-4"
              : direction === "row" && "mt-2 ml-4 "
          }`}
        >
          <button
            type="button"
            onClick={doQuery}
            className={`px-6 py-2 sm:mr-2 rounded-full bg-gradient-to-l 
          from-primary-one to-primary-two dark:from-dark-primary-one dark:to-dark-primary-two font-roboto-condensed font-bold leading-4 text-black`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
