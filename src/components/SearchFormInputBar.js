import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { usePokemonDataContext } from "./PokemonContext";
import { Menu, Combobox } from "@headlessui/react";
import CriteriaEntry from "./CriteriaEntry";
import ModalForCriteria from "./ModalForCriteria";
import SearchSuggestion from "./SearchSuggestion";
import {
  getDeconstructedSearch,
  cleanMatches,
  checkTypeIndex,
  filterValidTypes,
  getAllMatchesForTypes,
} from "../helpers/MatchHandlers";
import { getNewParamsString } from "../helpers/GetUrlParams";
import toTitleCase from "../helpers/toTitleCase";
import { ReactComponent as AddIcon } from "../images/add-icon.svg";

const SearchFormInputBar = ({
  searchQuery,
  setSearchQuery,
  direction,
  className = "",
}) => {
  const [userInput, setUserInput] = useState(
    searchQuery.query ? searchQuery.query : "" // Inputs can't be null
  );
  const [storedCriteria, setStoredCriteria] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const pokemonData = usePokemonDataContext();
  const history = useHistory();

  const matchedSuggestions = useRef([]);
  const cleanUserInput = useRef("");
  const suggestionFocus = useRef(null);

  const inputHandle = (inputEvent) => {
    const value = inputEvent.target.value;
    const inputedTypes = getDeconstructedSearch(value, "type");
    let validTypes = new Array();

    const cleanInput = cleanMatches(inputedTypes, value);
    matchedSuggestions.current = cleanInput
      ? getAllMatchesForTypes(pokemonData.typeList, cleanInput)
      : [];

    cleanUserInput.current = cleanInput;
    setUserInput(value);

    if (inputedTypes.length !== 0) {
      validTypes = filterValidTypes(pokemonData.typeList, inputedTypes);
    }
    if (validTypes.length !== 0) addToCriteria(validTypes[0]);
  };

  const toggleModal = () => {
    setModalIsOpen(modalIsOpen ? false : true);
  };

  const addToCriteria = (input) => {
    if (storedCriteria.length < 2) {
      for (let i = 0; i < storedCriteria.length; i++) {
        const match = storedCriteria[i].match;
        if (match === input.match) {
          return;
        }
      }
      setStoredCriteria([...storedCriteria, input]);
    } else {
      console.log("types can't be more than 2, hardcoded btw");
    }
  };

  const removeFromCriteria = (criteria) => {
    if (typeof criteria === "undefined") {
      // hardcoded shit
      if (storedCriteria.length === 1) {
        setStoredCriteria([]);
      }
      if (storedCriteria.length === 2) {
        setStoredCriteria([storedCriteria[0]]);
      }
    } else {
      // i'll program this when i need it
    }
  };

  const searchUpdate = () => {
    const query = storedCriteria
      .reduce((acum, item) => `${acum}${item.category}:${item.match}+`, "")
      .trim()
      .slice(0, -1);
    setSearchQuery({ query: query });
    history.push({ search: getNewParamsString({ q: query }, true) });
  };

  const inputKeyHandler = (event) => {
    switch (event.key) {
      case "Backspace":
        if (event.target.selectionStart === 0) {
          removeFromCriteria();
        }
      /*
      case "Enter":
        searchUpdate();
        break;
*/
      default:
        return;
    }
  };

  /*
  const suggestionKeyHandler = (event) => {
    switch (event.code) {
      case "Enter":
      case "Space":
        setUserInput(suggestionFocus.current);
        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
      default:
        return;
    }
  };
  */

  useEffect(() => {
    /*
    if (pokemonData) {
      let validTypes = new Array();
      const queryTypes = getDeconstructedSearch(searchQuery.query, "type");

      if (queryTypes.length !== 0) {
        validTypes = filterValidTypes(pokemonData.typeList, queryTypes);
      }
      if (validTypes.length !== 0) addToCriteria(validTypes[0]);
    }
    */

    if (searchQuery.query) setUserInput(searchQuery.query);
  }, [searchQuery]);

  return (
    <>
      <div role="search" className={className}>
        <div
          className={
            direction === "column"
              ? "flex flex-col justify-center content-center"
              : direction === "row" &&
                "flex flex-row justify-center content-center grow-0 shrink-0 mx-4 sm:mx-0"
          }
        >
          <div
            className={`w-full rounded-lg shadow ${direction === "row" && ""}`}
          >
            <Combobox value="" onChange={addToCriteria}>
              <div className="flex h-12 mx-auto">
                <Menu as="div" className="relative">
                  <Menu.Button className=" w-12 h-12" aria-label="Add">
                    <AddIcon className="w-12 h-12 p-3" />
                  </Menu.Button>
                  <Menu.Items className="absolute z-10 px-4 p-3.5 ml-[-100%] rounded-lg shadow bg-on-tertiary text-tertiary-color">
                    <div className="flex flex-col justify-between whitespace-nowrap">
                      <Menu.Item className="my-0.5 cursor-pointer">
                        {({ active }) => (
                          <div
                            className={`${active && "bg-blue-500"}`}
                            onClick={toggleModal}
                          >
                            Add Type
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item
                        disabled
                        className="my-0.5 cursor-not-allowed text-slate-500"
                      >
                        <div>Add Ability</div>
                      </Menu.Item>
                      <Menu.Item
                        disabled
                        className="my-0.5 cursor-not-allowed text-slate-500"
                      >
                        <div>Add Generation</div>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
                <div className="flex flex-row grow-0 shrink-0 my-2 select-none">
                  {storedCriteria.map(({ match, category }, index) => (
                    <CriteriaEntry
                      key={`criteria-${index}`}
                      match={match}
                      category={category}
                    />
                  ))}
                </div>
                <Combobox.Input
                  value={userInput}
                  onChange={inputHandle}
                  onKeyDown={inputKeyHandler}
                  placeholder={
                    storedCriteria.length === 0
                      ? "Add a criteria or type here something"
                      : undefined
                  }
                  aria-autocomplete="both"
                  className="grow focus:outline-none font-roboto-condensed"
                />
              </div>

              {userInput.length !== 0 && (
                <Combobox.Options className=" pl-12 pb-4 font-roboto-condensed bg-white rounded-b-lg">
                  {matchedSuggestions.current.length === 0 ? (
                    <div className="text-slate-500">
                      Nothing found, try something different
                    </div>
                  ) : (
                    matchedSuggestions.current.map(
                      (suggestion, index) =>
                        index < 6 && (
                          <Combobox.Option
                            key={`matchresult-${index}`}
                            value={suggestion}
                            className={({ active }) =>
                              `relative cursor-pointer select-none pb-2 pr-4 ${
                                active ? "bg-secondary-one" : "text-black"
                              }`
                            }
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="truncate">
                                  <span
                                    className={`pr-2 ${
                                      active ? "text-white" : "text-slate-500"
                                    }`}
                                  >
                                    {toTitleCase(suggestion.category)}
                                  </span>
                                  <span
                                    className={
                                      active ? "text-white" : "text-black"
                                    }
                                  >
                                    {toTitleCase(suggestion.match)}
                                  </span>
                                </div>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        )
                    )
                  )}
                </Combobox.Options>
              )}
            </Combobox>
            <ModalForCriteria
              modalIsOpen={modalIsOpen}
              toggleModal={toggleModal}
              criteria={"type"}
              storedCriteria={storedCriteria}
              setStoredCriteria={setStoredCriteria}
            />
          </div>
          <div
            className={`${
              direction === "column"
                ? "inline-block text-center mt-4"
                : direction === "row" && "mt-2 ml-4 "
            }`}
          >
            <button
              type="button"
              onClick={searchUpdate}
              className={`px-6 py-2 sm:mr-2 rounded-full bg-gradient-to-l 
          from-primary-one to-primary-two font-roboto-condensed font-bold leading-4 text-black`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFormInputBar;
