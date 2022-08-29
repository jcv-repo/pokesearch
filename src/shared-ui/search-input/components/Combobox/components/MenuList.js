import { components } from "react-select";

export const menuListStyles = ({ paddingTop, paddingBottom, ...provided }) => ({
  ...provided,
});

export const MenuList = (props) => (
  <components.MenuList {...props} className="pb-2" />
);
