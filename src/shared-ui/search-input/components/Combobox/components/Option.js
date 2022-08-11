import { components } from "react-select";

export const optionStyles = ({ padding, ...provided }, state) => ({
  ...provided,
});

export const Option = ({ data, ...props }) => (
  <components.Option {...props} className="px-4 py-1.5">
    <span className="inline-block mr-1 text-slate-500">{data.category}</span>
    <span>{data.label}</span>
  </components.Option>
);
