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

  const cleanCategory = category.replaceAll("-", "");
  const cleanParams = (params || "").replaceAll("-", "");

  const data = await database.pokemonData
    .where(cleanCategory)
    .equals(params ? cleanParams : genericParamKeyword)
    .toArray();

  console.log(data, category, params ? cleanParams : genericParamKeyword);
  if (data && data.length > 0) {
    console.log(`HEY returned ${params} in ${category}`);
    return data[0];
  }
  return null;
};
