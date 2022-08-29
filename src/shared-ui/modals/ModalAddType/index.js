import { useState } from "react";
import { Modal } from "#components/modal";
import { PokemonTypeLabel } from "#components/pokemon/type";

export const ModalAddType = ({
  isOpen,
  toggle,
  callback,
  initialValue,
  dataList /* List of Types */,
}) => {
  const [selectedValues, setSelectedValues] = useState(initialValue);

  const applyChangesAndClose = () => {
    if (typeof callback === "function") {
      callback({ type: selectedValues });
    }
    toggle();
  };

  const checkboxHandler = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      if (!(selectedValues || []).includes(value)) {
        setSelectedValues((prevValues) =>
          prevValues ? [...prevValues, value] : [value]
        );
      }
    } else {
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={"Add a type"}
      description={"Select up to two Pokemon types"}
      callback={applyChangesAndClose}
    >
      <ul className="flex flex-wrap">
        {dataList.map((type) => {
          const isSelected = selectedValues?.includes(type) || false;
          const isDisabled = selectedValues?.length > 1 && !isSelected;
          const id = `pokemon-type-${type}`;
          return (
            <li
              key={id}
              aria-labelledby={id}
              className="flex basis-1/2 md:basis-4/12 justify-center mb-2 list-none"
            >
              <label>
                <PokemonTypeLabel
                  value={type}
                  id={id}
                  isDisabled={!isSelected}
                  className={isDisabled && "opacity-25"}
                />
                <input
                  type="checkbox"
                  value={type}
                  checked={isSelected}
                  onChange={checkboxHandler}
                  disabled={isDisabled}
                  className="hidden"
                />
              </label>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};
