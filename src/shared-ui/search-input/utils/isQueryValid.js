import { getDeconstructedSearch } from "#utils/getDeconstructedSearch";

export const isQueryValid = (selectionList, options) => {
  let isValid = true;
  let categoryCounter = {};
  for (const selection of selectionList) {
    const { category } = getDeconstructedSearch(selection)[0];
    const indexInOptions = options.findIndex(
      (option) => option.name === category
    );

    if (indexInOptions === -1) {
      isValid = false;
      break;
    }

    const count = categoryCounter[category];
    const maxAllowed = options[indexInOptions].maxAllowed || 1;

    if (count === undefined) {
      categoryCounter[category] = 1;
    } else {
      if (count === maxAllowed) {
        isValid = false;
        break;
      } else {
        categoryCounter[category] += 1;
      }
    }
  }

  return isValid;
};
