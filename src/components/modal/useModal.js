import { useState } from "react";

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = (shouldOpen) => {
    switch (shouldOpen) {
      case true:
        setModalIsOpen(true);
        break;

      case false:
        setModalIsOpen(false);
        break;

      default:
        if (modalIsOpen) {
          setModalIsOpen(false);
        } else {
          setModalIsOpen(true);
        }
    }
  };

  return { modalIsOpen, toggleModal };
};
