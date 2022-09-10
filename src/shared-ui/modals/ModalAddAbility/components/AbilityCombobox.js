// React
import { Fragment, useState } from "react";
import { Combobox } from "@headlessui/react";
// Utils
import { cleanString } from "#utils/cleanString";
// Assets
import { ReactComponent as SearchIcon } from "#assets/images/search_icon.svg";

export const AbilityCombobox = ({
  dataList,
  selectedValues,
  setSelectedValues,
  maxSuggestions,
}) => {
  const [userInput, setUserInput] = useState("");

  const handleChange = (input) => {
    setSelectedValues(input);
    setUserInput("");
  };

  const filterMatches = () => {
    const results = [];

    if (userInput.length > 0) {
      for (const ability of dataList) {
        if (cleanString(ability).includes(cleanString(userInput))) {
          results.push(ability);
        }
        if (results.length >= maxSuggestions) {
          break;
        }
      }
    }

    return results;
  };

  const filteredMatches = filterMatches();

  return (
    <div className="relative">
      <Combobox value={selectedValues} onChange={handleChange}>
        <div className="flex items-center p-1 mr-4">
          <SearchIcon className="mr-2" />
          <Combobox.Input
            placeholder="Type an Ability"
            displayValue={() => userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className="w-36 focus:outline-none"
          />
        </div>
        <Combobox.Options className="flex flex-row flex-wrap overflow-hidden absolute z-10 w-full py-2 rounded-b-xl bg-tertiary-one">
          {filteredMatches.map((match) => (
            <Combobox.Option
              key={`ability-match-${match}`}
              value={match}
              as={Fragment}
            >
              {({ active }) => (
                <div
                  className={`w-full py-1 pl-6 ${
                    active && "bg-secondary-two text-on-secondary"
                  }`}
                >
                  {match}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};
