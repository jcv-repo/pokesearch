import { components } from "react-select";

export const valueContainerStyles = ({ padding, ...provided }, state) => ({
  ...provided,
  // flexWrap: state.selectProps.menuIsOpen ? "wrap" : "nowrap",
});

export const ValueContainer = (props) => (
  <div
    className="flex grow basis-0 py-2"
    ref={props.selectProps.selectProps.valueContainerElement}
  >
    <components.ValueContainer {...props} />
  </div>
);
