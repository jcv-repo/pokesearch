import { components } from "react-select";

export const selectContainerStyles = ({ position, ...provided }) => ({
  ...provided,
});

export const SelectContainer = (props) => (
  <components.SelectContainer
    {...props}
    className={`before:block before:absolute before:left-0 before:z-[-1] before:w-full before:h-full before:rounded-md ${
      (!props.selectProps.menuIsOpen ||
        props.selectProps.inputValue.trim().length === 0) &&
      "before:bg-tertiary-color before:shadow-combobox"
    }`}
  />
);
