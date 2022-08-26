// React
import { useEffect, useRef, useState } from "react";
// Components
import { Modal } from "#components/modal";
import { AbilityCombobox } from "./components/AbilityCombobox";
import { LetterGroupsTabs } from "./components/LetterGroupsTabs";
import { ListOfAbilities } from "./components/ListOfAbilities";
// Utils
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

  const maxSuggestions = 8;
  const letterGroupCount = 6;
  const scrollCallInterval = 100;

  //

  const [selectedValues, setSelectedValues] = useState(initialValue || []);
  const [letterGroupOnScreen, setLetterGroupOnScreen] = useState(0);

  const abilityGroups = useRef(null);
  const firstRender = useRef(true);
  const letterGroupElements = useRef([]);

  const scrollIntoGroup = (index) => {
    letterGroupElements.current[index].scrollIntoView({ behavior: "smooth" });
  };

  const applyChangesAndClose = () => {
    callback({ ability: [selectedValues] });
    toggle();
  };

  if (firstRender.current === true) {
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
        <AbilityCombobox
          dataList={dataList}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          maxSuggestions={maxSuggestions}
          scrollIntoGroup={scrollIntoGroup}
        />
        <LetterGroupsTabs
          selectedGroup={letterGroupOnScreen}
          abilityGroups={abilityGroups}
          setLetterGroupOnScreen={setLetterGroupOnScreen}
          scrollIntoGroup={scrollIntoGroup}
        />
      </div>

      <ListOfAbilities
        abilityGroups={abilityGroups}
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        letterGroupOnScreen={letterGroupOnScreen}
        setLetterGroupOnScreen={setLetterGroupOnScreen}
        letterGroupElements={letterGroupElements}
        scrollCallInterval={scrollCallInterval}
        firstRender={firstRender}
        className="relative overflow-y-scroll"
      />
    </Modal>
  );
};
