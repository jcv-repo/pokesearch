import { Link, useLocation } from "react-router-dom";
import { SearchInput } from "#shared-ui/search-input";
import { Logo } from "#components/logo";

export const Header = ({ searchQuery, setSearchQuery }) => {
  const { pathname } = useLocation();

  return (
    <header className="fixed z-20 w-full p-2 sm:py-2 xl:py-4 sm:px-4 bg-tertiary-one">
      <div
        className="flex flex-col sm:flex-row xl:w-[1180px] xl:mx-auto"
        role="banner"
      >
        <div className="basis-10 sm:basis-12 shrink-0 h-10 sm:h-12 sm:w-1/6 p-2 mr-2">
          <Link to={pathname}>
            <Logo
              showMini={true}
              className="h-full sm:h-auto sm:max-h-8 mx-auto sm:mx-0"
            />
          </Link>
        </div>

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          direction="row"
          showButtonMessage={false}
          showButtonIcon={true}
          className="relative w-full sm:w-3/4 lg:w-1/2 z-10"
        />
      </div>
    </header>
  );
};
