import { database, genericParamKeyword } from "./db";

export const storeInDatabase = async (data, category, params = null) => {
  if (data === undefined) {
    throw new Error("Missed first argument, it must be the data to store");
  }
  if (typeof category !== "string") {
    if (category === undefined) {
      throw new Error(
        "Missed second argument, it must be a string with the corresponding data category"
      );
    } else {
      throw new TypeError(`${category} is not a string`);
    }
  }

  // we will always override whatever is there for now
  if (database.pokemonData) {
    database.pokemonData.clear();
  }

  const cleanCategory = category.replaceAll("-", "");
  const cleanParams = params ? params.replaceAll("-", "") : genericParamKeyword;

  database.pokemonData
    .add({
      [cleanCategory]: cleanParams,
      data,
    })
    .then(() => {
      console.log(`added ${params} in ${category}`);
      // mommy milkers
    })
    .catch(() => {
      console.error(
        `Failed to add ${category}.${
          params ? params : genericParamKeyword
        } to the database`
      );
    });
};
