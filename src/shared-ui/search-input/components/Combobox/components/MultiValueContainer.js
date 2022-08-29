import { useRef } from "react";
import { components } from "react-select";

export const multiValueContainerStyles = ({
  backgroundColor,
  margin,
  ...provided
}) => ({
  provided,
});

export const MultiValueContainer = ({ children, innerProps, ...props }) => {
  return (
    <components.MultiValueContainer>
      <div
        className="flex px-4 py-2 mr-2 rounded-full bg-gradient-to-r 
    from-secondary-two to-secondary-one text-on-secondary dark:from-dark-secondary-two dark:to-dark-secondary-one dark:text-dark-on-secondary font-roboto-condensed font-bold leading-4"
        // ref={element => {props.selectProps.selectProps.multiValueContainerElements.current[]}}
      >
        {children}
      </div>
    </components.MultiValueContainer>
  );
};
