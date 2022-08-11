import { components } from "react-select";

export const MultiValueContainer = (props) => {
  // console.log(props);

  return (
    <components.MultiValueContainer>
      <div
        className="flex px-4 py-2 mr-2 rounded-full bg-gradient-to-r 
    from-secondary-two to-secondary-one text-on-secondary font-roboto-condensed font-bold leading-4"
      >
        {props.children}
      </div>
    </components.MultiValueContainer>
  );
};
