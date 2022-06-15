import { Link } from "react-router-dom";
import { ThemeContext } from "../styles/themes";
import SearchFormInputBar from "./SearchFormInputBar";
import LightOrDarkThemeToggle from "./LightOrDarkThemeToggle";
import Logo from "./Logo";

const SearchFormHeader = ({ searchQuery, setSearchQuery, className = "" }) => {
  return (
    <div className={className}>
      <header className="w-full sm:h-16" role="banner">
        <div>
          <Link to="/" className=" sm:absolute sm:t-2 sm:ml-4 sm:mr-0">
            <Logo className="h-8  mx-auto mt-4 sm:mt-2" />
          </Link>

          <div className="relative w-full mx-auto my-4 z-10 sm:w-1/3">
            <SearchFormInputBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              direction="row"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default SearchFormHeader;
