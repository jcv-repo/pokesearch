import { ThemeContext } from "../styles/themes";
import SearchFormInputBar from "./SearchFormInputBar";
import LightOrDarkThemeToggle from "./LightOrDarkThemeToggle";
import Logo from "./Logo";

const SearchFormHome = ({ searchQuery, setSearchQuery, className = "" }) => {
  return (
    <div className={className}>
      <header>
        <Logo className="max-w-xs px-4 mx-auto mb-8" />
      </header>

      <div className="flex justify-center">
        <SearchFormInputBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          direction="column"
          className="w-full sm:w-1/2 mx-auto"
        />
      </div>
    </div>
  );
};

export default SearchFormHome;
