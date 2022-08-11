export const filterInvalidPokemonTypes = (
  listOfPokemonTypes /* from the api */
) => {
  if (Array.isArray(listOfPokemonTypes)) {
    const invalidTypes = ["unknown", "shadow"];

    return listOfPokemonTypes.filter(
      (type) => invalidTypes.indexOf(type.name) === -1
    );
  }

  throw new Error(
    `${listOfPokemonTypes} must be an array of all Pokemon types directly fetched from the API`
  );
};
