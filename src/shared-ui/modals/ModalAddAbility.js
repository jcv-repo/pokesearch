import { useEffect, useRef, useState, Fragment } from "react";
import { Tab } from "@headlessui/react";
import { Modal } from "#components/modal";
import { ModalAbilityLabel } from "./components/ModalAbilityLabel";
import { getWordsSortedInLetterGroups } from "#utils/getWordsSortedInLetterGroups";
import { cleanString } from "#utils/cleanString";
import { ReactComponent as SearchIcon } from "#assets/images/search_icon.svg";

export const ModalAddAbility = ({
  isOpen,
  toggle,
  callback,
  initialValue,
  dataList /* List of Abilities */,
}) => {
  //
  // Config
  //

  const letterGroupCount = 6;
  const scrollCallInterval = 300;

  //

  const [selectedValues, setSelectedValues] = useState(initialValue);
  const [userInput, setUserInput] = useState("");
  const [letterGroupOnScreen, setLetterGroupOnScreen] = useState(0);

  const abilityGroups = useRef(null);
  const firstRender = useRef(true);
  const letterGroupElements = useRef([]);

  const scrollLetterGroupLastUpdate = useRef(null);

  const getGroupLabel = (start, end) =>
    start === end
      ? start.toUpperCase()
      : start.toUpperCase() + " - " + end.toUpperCase();

  const scrollIntoGroup = (index) => {
    letterGroupElements.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const applyChangesAndClose = () => {
    callback({ ability: [selectedValues] });
    toggle();
  };

  const handleInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleTabChange = (index) => {
    scrollIntoGroup(index);
    setLetterGroupOnScreen(index);
  };

  const handleScroll = ({ target: element }) => {
    window.requestAnimationFrame(() => {
      const height = element.clientHeight;
      const scrollTop = element.scrollTop;

      if (letterGroupElements.current.length > 0) {
        //
        // if clorotolia roasts you for using fors, show him this :
        //
        //
        // const letterGroupOffsets = letterGroupElements.current
        //   .map(({ offsetTop }) => offsetTop)
        //   .reverse();

        // const indexOnScreen = Math.abs(
        //   letterGroupOffsets.findIndex(
        //     (offsetTop) => scrollTop > offsetTop - height / 2
        //   ) -
        //     letterGroupOffsets.length +
        //     1
        // );

        const letterGroupOffsets = letterGroupElements.current.map(
          ({ offsetTop }) => offsetTop
        );

        let indexOnScreen = 0;
        for (let i = letterGroupOffsets.length - 1; i > 0; i--) {
          const offsetTop = letterGroupOffsets[i];
          if (scrollTop > offsetTop - height / 2) {
            indexOnScreen = i;
            break;
          }
        }

        if (indexOnScreen !== letterGroupOnScreen) {
          const currentTime = new Date();
          if (
            currentTime - scrollLetterGroupLastUpdate.current >
            scrollCallInterval
          ) {
            console.log("update scorll state");
            scrollLetterGroupLastUpdate.current = currentTime;
            // setLetterGroupOnScreen(indexOnScreen);
          }
        }
      }
    });
  };

  const filterMatches = () => {
    const maxResults = 18;
    const results = [];

    if (userInput.length > 0) {
      for (const ability of dataList) {
        if (cleanString(ability).includes(cleanString(userInput))) {
          results.push(ability);
        }
        if (results.length >= maxResults) {
          break;
        }
      }
    }

    return results;
  };

  const inputMatches = filterMatches();

  if (firstRender.current) {
    abilityGroups.current = getWordsSortedInLetterGroups(
      dataList,
      letterGroupCount
    );
  }

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Add an ability"}
      description={"Select one Pokemon ability"}
      shouldContentScroll={false}
      callback={applyChangesAndClose}
    >
      <div className="flex">
        <div className="flex items-center p-1 mr-4">
          <SearchIcon className="mr-2" />
          <input
            value={userInput}
            onChange={handleInput}
            placeholder="Type an Ability"
            className="focus:outline-none"
          />
        </div>
        <Tab.Group
          selectedIndex={letterGroupOnScreen}
          onChange={(index) => handleTabChange(index)}
          className="flex justify-center ml-auto"
          manual
        >
          <Tab.List>
            {abilityGroups.current.map((letterGroup) => {
              const groupLabel = getGroupLabel(
                letterGroup.start,
                letterGroup.end
              );

              return (
                <Tab key={`tab-${groupLabel}`} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={` px-2 py-0.5 font-roboto-condensed ${
                        selected
                          ? "rounded-full bg-gradient-to-r from-secondary-two to-secondary-one text-on-secondary"
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
      </div>

      {userInput.length > 0 && (
        <ul className="flex flex-row flex-wrap ">
          {inputMatches.map((match) => (
            <li key={`ability-match-${match}`} className="basis-1/2 mb-1">
              {match}
            </li>
          ))}
        </ul>
      )}

      <ol
        className={`relative overflow-y-scroll ${
          userInput.length > 0 && "hidden"
        }`}
        onScroll={handleScroll}
      >
        {abilityGroups.current.map((letterGroup, index) => {
          const start = letterGroup.start;
          const end = letterGroup.end;
          const groupLabel = getGroupLabel(start, end);
          const titleID = `letter-group-title-${start}-${end}`;
          return (
            <li
              key={`letter-group-${groupLabel}`}
              ref={(element) => (letterGroupElements.current[index] = element)}
              aria-labelledby={titleID}
              className="mb-8"
            >
              <h4 id={titleID} className="text-4xl font-roboto-condensed mb-2">
                {groupLabel}
              </h4>
              <ol className="flex flex-row flex-wrap">
                {letterGroup.matches.map((ability) => (
                  <ModalAbilityLabel
                    key={`ability-${ability}`}
                    ability={ability}
                    setSelectedValues={setSelectedValues}
                    className={`basis-1/2 mb-1 ${
                      selectedValues === ability ? "text-red-400" : ""
                    }`}
                  />
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </Modal>
  );
};
