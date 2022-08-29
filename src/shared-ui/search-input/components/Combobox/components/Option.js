import { components } from "react-select";

export const optionStyles = (
  { padding, backgroundColor, color, ...provided },
  state
) => ({
  ...provided,
});

export const Option = ({ data, isFocused, ...props }) => (
  <components.Option
    {...props}
    className={`px-4 py-1 ${isFocused && "bg-secondary-two text-on-secondary"}`}
  >
    <span className={`inline-block mr-1 ${!isFocused && "text-slate-500"}`}>
      {data.category}
    </span>
    <span>{data.match.replaceAll("-", " ")}</span>
  </components.Option>
);
