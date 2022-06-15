import { BrowserRouter as Router } from "react-router-dom";
import Page from "./components/Page";
import { PokemonDataContextProvider } from "./components/PokemonContext";

const App = () => (
  <Router>
    <PokemonDataContextProvider>
      <Page />
    </PokemonDataContextProvider>
  </Router>
);

export default App;
