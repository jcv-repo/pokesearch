import { components } from "react-select";

export const menuStyles = ({ background, border, ...provided }, state) => ({
  ...provided,
  background: "transparent",
  left: 0,
  marginTop: `-${state.selectProps.selectProps.comboBoxHeight.current}px`,
  paddingTop: `${state.selectProps.selectProps.comboBoxHeight.current}px`,
  zIndex: -1,
});

export const Menu = (props) => {
  console.log(props.selectProps);
  const comboboxHeight = props.selectProps.selectProps.comboBoxHeight.current;

  return props.selectProps.inputValue.length > 0 ? (
    <components.Menu
      {...props}
      className="font-roboto-condensed before:block before:absolute before:top-0 before:z-0 before:w-full before:h-full before:rounded-lg before:shadow before:bg-white"
    />
  ) : (
    <></>
  );
};
