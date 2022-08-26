import { database } from "./db";

// please
// fix

export const getFromDatabase = async () => {
  // if (typeof category !== "string") {
  //   if (category === undefined) {
  //     throw new Error(
  //       "Missed first argument, it must be a string with the corresponding data category"
  //     );
  //   } else {
  //     throw new TypeError(`${category} is not a string`);
  //   }
  // }

  // const cleanCategory = category.replaceAll("-", "");

  //
  // gonna ???????????????? all day long
  //

  const data = await database.pokemonData
    .where("pokemon")
    .equals("pokemon")
    .toArray();

  if (data && data.length > 0) {
    return JSON.parse(data[0].data);
  }
  return null;
};
