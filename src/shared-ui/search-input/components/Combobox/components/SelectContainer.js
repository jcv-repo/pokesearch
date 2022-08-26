import { components } from "react-select";

export const selectContainerStyles = ({ position, ...provided }) => ({
  ...provided,
});

export const SelectContainer = (props) => (
  <components.SelectContainer {...props} />
);
