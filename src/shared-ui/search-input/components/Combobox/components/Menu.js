import { components } from "react-select";

export const menuStyles = (
  { background, border, boxShadow, ...provided },
  state
) => {
  const height =
    state.selectProps.selectProps.containerElement.current.controlRef
      .offsetHeight;
  return {
    ...provided,
    background: "transparent",
    left: 0,
    marginTop: `-${height}px`,
    marginBottom: 0,
    paddingTop: `${height}px`,
    zIndex: -1,
  };
};

export const Menu = ({ children, ...props }) => {
  const isInputValueEmpty = props.selectProps.inputValue.trim().length === 0;

  return !isInputValueEmpty ? (
    <components.Menu
      {...props}
      className="font-roboto-condensed before:block before:absolute before:top-0 before:z-0 before:w-full before:h-full before:rounded-lg before:shadow-combobox before:bg-white"
    >
      {children}
    </components.Menu>
  ) : (
    <></>
  );
};
