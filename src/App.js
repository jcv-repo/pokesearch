import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./app/context";
import { PokemonDataContextProvider } from "./data/context";
import { SearchForm } from "./ui";

const App = () => (
  <BrowserRouter>
    <Switch>
      <AppContextProvider>
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
