import { components } from "react-select";

export const controlStyles = (provided, state) => ({
  ...provided,
  border: 0,
  boxShadow: "none",
  cursor: "text",
});

export const Control = (props) => <components.Control {...props} />;
