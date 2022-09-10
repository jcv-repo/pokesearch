import { ReactComponent as Icon } from "#assets/images/search-icon.svg";

export const SearchIcon = ({ onClick, className = "" }) => (
  <button onClick={onClick} className={`flex items-center  ${className}`}>
    <Icon className="w-12 h-12 p-3" fill="#ff0000" />
  </button>
);
