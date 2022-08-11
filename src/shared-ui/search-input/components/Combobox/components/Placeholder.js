import { components } from "react-select";

export const placeholderStyles = ({ color, ...provided }, state) => ({
  ...provided,
  margin: 0,
});

export const Placeholder = (props) => (
  <components.Placeholder
    {...props}
    className="grow focus:outline-none font-roboto-condensed text-slate-400"
  />
);
