import { components } from "react-select";

export const menuStyles = ({ background, shadow, ...provided }, state) => ({
  ...provided,
  background: "transparent",
});

export const Menu = (props) =>
  props.selectProps.inputValue.length > 0 ? (
    <components.Menu {...props} className="font-roboto-condensed" />
  ) : (
    <></>
  );
