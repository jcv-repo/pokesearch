// React
import { useEffect, useRef } from "react";
import Select from "react-select";
// Components
import {
  SelectContainer,
  selectContainerStyles,
} from "./components/SelectContainer";
import { Control, controlStyles } from "./components/Control";
import { Input } from "./components/Input";
import {
  ValueContainer,
  valueContainerStyles,
} from "./components/ValueContainer";
import { MultiValueContainer } from "./components/MultiValueContainer";
import { MultiValueLabel } from "./components/MultiValueLabel";
import { MultiValueRemove } from "./components/MultiValueRemove";
import { Placeholder, placeholderStyles } from "./components/Placeholder";
import { Menu, menuStyles } from "./components/Menu";
import { Option, optionStyles } from "./components/Option";
// Hooks
import { useSuggestions } from "./hooks/useSuggestions";
// Utils
import { getFormattedValue } from "./utils/getFormattedValue";
import { getSelectionInput } from "./utils/getSelectionInput";

//
//
//

export const Combobox = ({
  // Mandatory
  data,
  options,
  inputValue,
  inputCallback,
  selectedValues,
  selectedCallback,

  // Optional
  maxSuggestionCount = 5,
  isLoading = false,
  placeholder,
  loadingMessage,
  noMatchesMessage,
  className = "",
}) => {
  //
  // Suggestions and formatting
  //

  //
  //
  // TODO:
  // many of this  is called every re-render when its the same every time but
  // using useEffect would case to show delayed updates, so.... todo
  //
  //

  const selection = isLoading
    ? []
    : Object.keys(selectedValues).reduce(
        (acum, category) => [
          ...acum,
          ...selectedValues[category].map((value) =>
            getFormattedValue(category, value)
          ),
        ],
        []
      );

  const filteredOptions = options.filter((category) => {
    const catInSelection = selectedValues[category.name];

    if (catInSelection) {
      if (catInSelection.length >= (category.maxAllowed || 1)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });

  const { findSuggestions } = useSuggestions(
    data,
    inputValue,
    filteredOptions,
    maxSuggestionCount
  );

  let suggestions = [];

  if (data) {
    suggestions = findSuggestions().map(({ category, match }) =>
      getFormattedValue(category, match)
    );
  }

  //
  // Styles
  //

  const comboBoxElement = useRef(null);
  const comboBoxHeight = useRef(null);

  const customStyles = {
    container: selectContainerStyles,
    control: controlStyles,
    placeholder: placeholderStyles,
    valueContainer: valueContainerStyles,
    menu: menuStyles,
    option: optionStyles,
  };

  //
  // Callbacks
  //

  const handleSelectionChange = (selection) => {
    selectedCallback(getSelectionInput(selection), false);
  };

  //
  // useEffects
  //

  useEffect(() => {
    if (comboBoxElement.current === null) {
      return;
    }
    if (comboBoxElement.current.controlRef === null) {
      return;
    }

    comboBoxHeight.current = comboBoxElement.current.controlRef.offsetHeight;

    console.log(comboBoxElement.current);
  }, []);

  //
  //
  //

  //
  //
  //

  return (
    <div className={className}>
      <Select
        isMulti
        inputValue={inputValue}
        onInputChange={inputCallback}
        options={suggestions}
        getOptionValue={(options) =>
          `${options.category.toLowerCase()}:${options.match.toLowerCase()}`
        }
        getOptionLabel={(options) => options.match}
        filterOptions={() => true}
        value={selection}
        onChange={handleSelectionChange}
        isLoading={isLoading}
        loadingMessage={() => loadingMessage || "Loading"}
        noOptionsMessage={() => noMatchesMessage || "No matches"}
        placeholder={placeholder || "Enter your text"}
        selectProps={{ inputValue, comboBoxHeight }}
        styles={customStyles}
        ref={comboBoxElement}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          SelectContainer,
          Control,
          Input,
          ValueContainer,
          MultiValueContainer,
          MultiValueLabel,
          Placeholder,
          Menu,
          Option,
        }}
      />
    </div>
  );
};
