import { useState } from "react";
import { Modal } from "#components/modal";
import { ModalGenerationLabel } from "./components/ModalGenerationLabel";

export const ModalAddGeneration = ({
  isOpen,
  toggle,
  initialValue,
  callback,
  dataList /* List of Generations */,
}) => {
  const [selectedValues, setSelectedValues] = useState(initialValue);

  const applyChangesAndClose = () => {
    if (typeof callback === "function") {
      callback({ generation: selectedValues });
    }
    toggle();
  };

  const checkboxHandler = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      if (selectedValues.indexOf(value) === -1) {
        setSelectedValues([...selectedValues, value]);
      }
    } else {
      setSelectedValues(
        selectedValues.filter((item) => {
          return item !== value;
        })
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Select a generation"}
      description={"Select one generation of Pokemon"}
      callback={applyChangesAndClose}
    >
      <ol className="flex flex-wrap content-center justify-center mt-8">
        {dataList.map((generation, index) => {
          const isDisabled = selectedValues && selectedValues !== generation;
          const isSelected = selectedValues && selectedValues === generation;
          const id = `pokemon-generation-${generation}`;
          return (
            <ModalGenerationLabel
              key={`generation-${generation}`}
              generation={generation}
              setSelectedValues={setSelectedValues}
            />
          );
        })}
      </ol>
    </Modal>
  );
};
