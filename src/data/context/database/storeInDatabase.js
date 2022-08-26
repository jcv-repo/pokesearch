import { database } from "./db";

// please
// fix

// please
// fix

export const storeInDatabase = async (data) => {
  if (data === undefined) {
    throw new Error("Missed first argument, it must be the data to store");
  }
  // if (!Array.isArray(categories)) {
  //   if (categories === undefined) {
  //     throw new Error(
  //       "Missed second argument, it must be an array with all the categories you want to include from the data"
  //     );
  //   } else {
  //     throw new TypeError(`${categories} is not an array`);
  //   }
  // }

  console.log(`Refresing database...`);

  database.pokemonData
    .put({
      // ???????????????
      pokemon: "pokemon",
      data: JSON.stringify(data),
    })
    .then(() => {
      console.log(`Database refreshed`);
    })
    .catch(() => {
      console.error(`Failed to add to the database`);
    });
};
