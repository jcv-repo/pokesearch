import { components } from "react-select";

export const multiValueRemoveStyles = ({
  paddingRight,
  paddingLeft,
  ":hover": hover,
  ...provided
}) => ({
  ...provided,
});

export const MultiValueRemove = ({ children, ...props }) => (
  <components.MultiValueRemove {...props}>
    <div className="w-4 h-4 ml-1 mr-[-0.25rem] rounded-lg leading-0 text-center hover:bg-on-secondary hover:text-secondary-one">
      <svg viewBox="0 0 20 20" className="css-tj5bde-Svg">
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
      </svg>
    </div>
  </components.MultiValueRemove>
);
