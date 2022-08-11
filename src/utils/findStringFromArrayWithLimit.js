export const findStringFromArrayWithLimit = (array, stringToMatch, limit) => {
  let result = [];

  for (const item of array) {
    if (result.length >= limit) {
      break;
    }
    if (item.indexOf(stringToMatch) !== -1) {
      result.push(item);
    }
  }

  return result;
};
