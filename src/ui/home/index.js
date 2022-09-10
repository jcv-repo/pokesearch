import { SearchInput } from "#shared-ui/search-input";
import { Logo } from "#components/logo";

export const Home = ({ searchQuery, setSearchQuery }) => (
  <div className="flex flex-col justify-center content-center h-screen mx-4">
    <header>
      <Logo className="max-w-xs px-4 mx-auto mb-8" />
    </header>

    <div className="flex justify-center">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        direction="column"
        className="w-full sm:w-1/2 mx-auto"
      />
    </div>
  </div>
);
