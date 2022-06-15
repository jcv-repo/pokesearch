import React, { createContext, useState, useEffect, useContext } from "react";
import {
  fetchAllPokemonList,
  fetchPokemonRealTypesList,
} from "../helpers/ApiHandlers";

// create context
const PokemonDataContext = createContext();
const timeLimit = 8000;

const PokemonDataContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [data, setData] = useState(null);

  useEffect(() => {
    const pokemonData = {};

    const fetchPokemonLists = async () => {
      try {
        pokemonData.pokemonList = await fetchAllPokemonList(timeLimit);
        pokemonData.typeList = await fetchPokemonRealTypesList(timeLimit);
        setData(pokemonData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPokemonLists();
  }, []);

  return (
    // the Provider gives access to the context to its children
    <PokemonDataContext.Provider value={data}>
      {children}
    </PokemonDataContext.Provider>
  );
};

// context consumer hook
const usePokemonDataContext = () => {
  // get the context
  const context = useContext(PokemonDataContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("usePokemonDataContext was used outside of its Provider");
  }

  return context;
};

export { PokemonDataContextProvider, usePokemonDataContext };
