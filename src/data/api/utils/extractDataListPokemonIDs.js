export const extractDataListPokemonIDs = (
  data,
  typeOfData,
  asNumbers = false
) => {
  if (typeof data !== "object" || data === null) {
    throw new Error(
      `${data} must be a piece of Pokemon data taken from the context`
    );
  }

  const getIDNumberFromPokemonUrl = (url) => {
    const regex = new RegExp(
      `${process.env.REACT_APP_POKEAPI_URL}(?:pokemon|pokemon-species)/(\\d+)`,
      "gi"
    );
    const match = regex.exec(url);

    return match === null ? null : parseInt(match[1]);
  };

  switch (typeOfData) {
    case "type":
      return data.pokemon.map(({ pokemon }) =>
        asNumbers ? getIDNumberFromPokemonUrl(pokemon.url) : pokemon.name
      );

    case "ability":
      return data.pokemon.map(({ pokemon }) =>
        asNumbers ? getIDNumberFromPokemonUrl(pokemon.url) : pokemon.name
      );

    case "generation":
      return data.pokemon_species.map(({ pokemon }) =>
        asNumbers ? getIDNumberFromPokemonUrl(pokemon.url) : pokemon.name
      );

    default:
      throw new Error(
        `${typeOfData} is not a valid type of data to extract Pokemon`
      );
  }
};
