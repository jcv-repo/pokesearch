export const getDeconstructedSearch = (stringToMatch, criteria) => {
  if (typeof stringToMatch !== "string") {
    throw TypeError(stringToMatch + " is not a string");
  }

  let regex;

  if (typeof criteria === "undefined") {
    regex = new RegExp(`([\\w-]+):([\\w-]+)`, "gi");
  } else {
    if (typeof criteria === "string") {
      regex = new RegExp(`(${criteria}):([\\w-]+)`, "gi");
    } else {
      throw TypeError(criteria + " is not a string");
    }
  }

  const matches = [...stringToMatch.matchAll(regex)];

  if (matches.length === 0) {
    return [];
  }

  const result = [];

  for (const match of matches) {
    const matchRegex = new RegExp(`${match[1]}:${match[2]}`, "i");

    const whereStart = stringToMatch.search(matchRegex);
    result.push({
      match: match[2],
      category: match[1],
      whereStart: whereStart,
      whereEnd: whereStart + match[1].length + match[2].length + 1,
    });
  }

  return result;
};
