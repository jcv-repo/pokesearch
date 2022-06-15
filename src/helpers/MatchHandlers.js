import cropString from "./cropString";

const availableCriteria = ["type", "ability", "color", "generation"];

const getDeconstructedSearch = (stringToMatch, criteria) => {
  if (typeof stringToMatch === "string") {
    let regex;

    if (typeof criteria === "undefined") {
      regex = new RegExp(`(\\w+):(\\w+)`, "gi");
    } else {
      if (typeof criteria === "string") {
        regex = new RegExp(`(${criteria}):(\\w+)`, "gi");
      } else {
        throw TypeError(criteria + " is not a string");
      }
    }

    const match = [...stringToMatch.matchAll(regex)];
    if (match.length === 0) {
      return [];
    }

    const result = new Array();

    match.forEach((item) => {
      const matchRegex = new RegExp(`${item[1]}:${item[2]}`, "i");
      let validCriteria = false;

      if (criteria) {
        validCriteria = true;
      } else {
        for (let i = 0; i < availableCriteria.length; i++) {
          if (item[1] === availableCriteria[i]) {
            validCriteria = true;
            break;
          }
        }
      }

      if (validCriteria) {
        const whereStart = stringToMatch.search(matchRegex);
        result.push({
          match: item[2],
          category: item[1],
          whereStart: whereStart,
          whereEnd: whereStart + item[1].length + item[2].length + 1,
        });
      }
    });
    return result;
  } else {
    throw TypeError(stringToMatch + " is not a string");
  }
};

const cleanMatches = (deconstructedMatches, stringToClean) => {
  if (typeof stringToClean === "string") {
    if (Array.isArray(deconstructedMatches)) {
      let dirtyString = stringToClean;
      let cachedLength = stringToClean.length;
      deconstructedMatches.forEach((item) => {
        const difference = dirtyString.length - cachedLength;
        dirtyString = cropString(
          dirtyString,
          item.whereStart + difference,
          item.whereEnd + difference
        );
      });
      return dirtyString.trim();
    } else {
      throw TypeError(
        deconstructedMatches +
          " must be an array that you get from getDeconstructedSearch()"
      );
    }
  } else {
    throw TypeError(stringToClean + " is not a string");
  }
};

const checkTypeIndex = (arrayOfPokemonTypes, entryToMatch) => {
  if (Array.isArray(arrayOfPokemonTypes)) {
    const isString = typeof entryToMatch === "string";
    const isArray = Array.isArray(entryToMatch);

    if (isString || isArray) {
      const getVerification = (entry) => {
        let index = -1;
        for (let i = 0; i < arrayOfPokemonTypes.length; i++) {
          const name = arrayOfPokemonTypes[i].name;
          const regex = new RegExp(name, "i");
          const match = entry.search(regex);
          if (match !== -1) {
            index = i + 1;
            break;
          }
        }
        return index;
      };

      if (isArray) {
        let result = new Array();
        entryToMatch.forEach((matchEntry) => {
          if (matchEntry.category === "type") {
            const index = getVerification(matchEntry.match);
            result.push({
              ...matchEntry,
              matchIndex: index,
            });
          }
        });
        return result;
      }

      if (isString) {
        return getVerification(entryToMatch);
      }
    } else {
      throw TypeError(entryToMatch + " is not either a string nor an array");
    }
  } else {
    throw TypeError(
      arrayOfPokemonTypes +
        " should be an array of all pokemon types fetched from the API"
    );
  }
};

const filterValidTypes = (arrayOfPokemonTypes, arrayToFilter) => {
  return checkTypeIndex(arrayOfPokemonTypes, arrayToFilter).filter(
    ({ matchIndex }) => {
      return matchIndex > -1;
    }
  );
};

const getAllMatchesForTypes = (arrayOfPokemonTypes, stringToMatch) => {
  if (Array.isArray(arrayOfPokemonTypes)) {
    if (typeof stringToMatch === "string") {
      let result = new Array();
      arrayOfPokemonTypes.forEach(({ name: type }) => {
        const regex = new RegExp(stringToMatch, "i");
        const match = type.search(regex);
        if (match !== -1) {
          result.push({
            match: type,
            category: "type",
            whereStart: match,
            whereEnd: match + type.length,
          });
        }
      });
      return result;
    } else {
      throw TypeError(stringToMatch + " is not a string");
    }
  } else {
    throw TypeError(
      arrayOfPokemonTypes +
        " should be an array of all pokemon types fetched from the API"
    );
  }
};

export {
  getDeconstructedSearch,
  cleanMatches,
  checkTypeIndex,
  filterValidTypes,
  getAllMatchesForTypes,
};
