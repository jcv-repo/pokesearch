import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { getGroupLabel } from "../utils/getGroupLabel";

export const LetterGroupsTabs = ({
  selectedGroup,
  abilityGroups,
  setLetterGroupOnScreen,
  scrollIntoGroup,
}) => {
  const handleTabChange = (index) => {
    scrollIntoGroup(index);
  };

  return (
    <Tab.Group
      selectedIndex={selectedGroup}
      onChange={(index) => handleTabChange(index)}
      className="flex justify-center ml-auto"
      manual
    >
      <Tab.List>
        {abilityGroups.current.map((letterGroup) => {
          const groupLabel = getGroupLabel(letterGroup.start, letterGroup.end);

          return (
            <Tab key={`tab-${groupLabel}`} as={Fragment}>
              {({ selected }) => (
                <button
                  className={` px-2 py-0.5 font-roboto-condensed ${
                    selected
                      ? "rounded-full bg-gradient-to-r from-secondary-two to-secondary-one text-on-secondary dark:from-dark-secondary-two dark:to-dark-secondary-one dark:text-dark-on-secondary"
                      : ""
                  }`}
                >
                  {groupLabel.replace(" - ", " ")}
                </button>
              )}
            </Tab>
          );
        })}
      </Tab.List>
    </Tab.Group>
  );
};
