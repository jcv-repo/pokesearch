import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { usePokemonDataContext } from "./PokemonContext";
import PokemonTypeLabel from "./PokemonTypeLabel";

const ModalForCriteria = ({
  modalIsOpen,
  toggleModal,
  criteria,
  storedCriteria,
  setStoredCriteria,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  const pokemonData = usePokemonDataContext();
  let title, description;

  switch (criteria) {
    case "type":
      title = "Add a type";
      description = "Add up to two Pokemon types";
      break;

    default:
      break;
  }

  const applyCriteriaAndClose = () => {
    const newCriteria = new Array();
    selectedValues.forEach((value) => {
      newCriteria.push({ match: value, category: criteria });
    });
    setStoredCriteria(newCriteria);
    toggleModal();
  };

  const checkboxHandler = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;
    const indexInSelected = selectedValues.indexOf(value);

    if (checked) {
      if (indexInSelected === -1) {
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
    <>
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>

                  {pokemonData && (
                    <div className="flex flex-wrap content-center justify-center mt-8">
                      {pokemonData.typeList.map(({ name: type }, index) => {
                        const isDisabled =
                          selectedValues.length > 1 &&
                          selectedValues.indexOf(type) === -1
                            ? true
                            : false;
                        const isSelected =
                          selectedValues.indexOf(type) === -1 ? false : true;
                        return (
                          <li
                            key={index}
                            className="flex grow-0 shrink-0 basis-4/12 content-center justify-center list-none mb-2"
                          >
                            <label>
                              <PokemonTypeLabel
                                value={type}
                                className={`${isDisabled && "opacity-25"} ${
                                  isSelected &&
                                  "relative z-1 outline outline-4 outline-secondary-one"
                                }`}
                              />
                              <input
                                type="checkbox"
                                value={type}
                                onClick={checkboxHandler}
                                disabled={isDisabled}
                                className="hidden"
                              />
                              <span className="checkmark hidden"></span>
                            </label>
                          </li>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={applyCriteriaAndClose}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalForCriteria;
