import { components } from "react-select";

export const valueContainerStyles = ({ padding, ...provided }, state) => ({
  ...provided,
});

export const ValueContainer = (props) => (
  <components.ValueContainer {...props} className=" py-2" />
);
