import Dexie from "dexie";

const database = new Dexie("PokemonDB");
const genericParamKeyword = "all";

const createDatabase = (initialCategories) => {
  if (!Array.isArray(initialCategories)) {
    throw new Error(
      "To create a database you need to provide an array with all the categories you are going to use as argument"
    );
  }

  database.version(1).stores({
    pokemonData: initialCategories.join().replaceAll("-", ""),
  });
};

export { database, createDatabase, genericParamKeyword };
