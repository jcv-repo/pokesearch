import { components } from "react-select";

export const MultiValueLabel = ({ data }) => (
  <components.MultiValueLabel>
    {data.category}: {data.match}
  </components.MultiValueLabel>
);
