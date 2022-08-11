import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppOverlay } from "./app";
import { AppContextProvider } from "./app/context";
import { PokemonDataContextProvider } from "./data/context";
import { SearchForm } from "./ui";

const App = () => (
  <BrowserRouter>
    <Switch>
      <AppContextProvider>
        <AppOverlay />
        <Route path="/">
          <PokemonDataContextProvider>
            <SearchForm />
          </PokemonDataContextProvider>
        </Route>
      </AppContextProvider>
    </Switch>
  </BrowserRouter>
);

export default App;
