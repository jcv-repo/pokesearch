import { useEffect, useRef, useState } from "react";
import { Modal } from "#components/modal";
import { ModalAbilityLabel } from "./components/ModalAbilityLabel";
import { getWordsSortedInLetterGroups } from "#utils/getWordsSortedInLetterGroups";

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

  //

  const [selectedValues, setSelectedValues] = useState(initialValue);
  const abilityGroups = useRef(null);
  const firstRender = useRef(true);
  const contentElement = useRef(null);

  const applyChangesAndClose = () => {
    callback({ ability: [selectedValues] });
    toggle();
  };

  const handleScroll = (event) => {
    console.log(event);
    window.requestAnimationFrame(() => {});
  };

  if (firstRender.current) {
    abilityGroups.current = getWordsSortedInLetterGroups(
      dataList,
      letterGroupCount
    );
  }

  useEffect(() => {
    firstRender.current = false;
    console.log(contentElement.current, isOpen);

    // if (contentElement.current !== null) {
    //   contentElement.current.addEventListener("scroll", handleScroll);
    // }

    // return () => {
    //   if (contentElement.current !== null) {
    //     contentElement.removeEventListener("scroll", handleScroll);
    //   }
    // };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Add an ability"}
      description={"Select one Pokemon ability"}
      contentRef={contentElement}
      callback={applyChangesAndClose}
    >
      <ol className="">
        {abilityGroups.current.map((letterGroup) => {
          const start = letterGroup.start;
          const end = letterGroup.end;
          const groupLabel =
            start === end
              ? start.toUpperCase()
              : start.toUpperCase() + " - " + end.toUpperCase();
          const titleID = `letter-group-title-${start}-${end}`;
          return (
            <li
              key={`letter-group-${groupLabel}`}
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
