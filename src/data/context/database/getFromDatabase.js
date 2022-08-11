import { database, genericParamKeyword } from "./db";

export const getFromDatabase = async (category, params) => {
  if (typeof category !== "string") {
    if (category === undefined) {
      throw new Error(
        "Missed first argument, it must be a string with the corresponding data category"
      );
    } else {
      throw new TypeError(`${category} is not a string`);
    }
  }
  /*
  console.log(`the database`, database.pokemonData);
  console.log(
    `what is ${params ? params : genericParamKeyword} in ${category}`
  );

  const asdf = await database.pokemonData.get(category);
  console.log(`${category} is`, asdf);

  const data = await database.pokemonData
    .where(category)
    .equals(params ? params : genericParamKeyword)
    .toArray();
  console.log(`the ${category} data from database`, data);
  if (data && data.length > 0) {
    return data[0];
  }
  */
  return null;
};
