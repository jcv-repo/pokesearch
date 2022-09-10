import { components } from "react-select";

export const controlStyles = ({ backgroundColor, ...provided }, state) => ({
  ...provided,
  border: 0,
  boxShadow: "none",
  cursor: "text",
});

export const Control = (props) => <components.Control {...props} />;
