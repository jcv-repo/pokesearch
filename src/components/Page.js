import { Route, Switch } from "react-router-dom";
import { SearchForm } from "#ui/SearchForm";
import { PokemonDataContextProvider } from "#root/providers/PokemonDataContext";

export const Page = () => (
  <div id="container" className="min-h-full">
    <Switch>
      <Route path="/">
        <PokemonDataContextProvider>
          <SearchForm />
        </PokemonDataContextProvider>
      </Route>
    </Switch>
  </div>
);
