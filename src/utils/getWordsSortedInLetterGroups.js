import { getStandardDeviation } from "./getStandardDeviation";
import { getAlphabeticallyOrderedList } from "./getAlphabeticallyOrderedList";

export const getWordsSortedInLetterGroups = (
  listOfWords,
  amountOfGroups = 0
) => {
  let classifiedWords = [];

  getAlphabeticallyOrderedList(listOfWords).forEach((name) => {
    const firstChar = name.charAt(0);
    const letter =
      firstChar.toLowerCase() !== firstChar.toUpperCase()
        ? firstChar.toLowerCase()
        : "#";

    const lastLetter =
      classifiedWords.length === 0
        ? ""
        : classifiedWords[classifiedWords.length - 1].letter;

    if (
      letter !== lastLetter ||
      (letter === "#" && classifiedWords[0].letter !== "#")
    ) {
      classifiedWords.push({ letter: letter, matches: [name] });
    } else {
      classifiedWords[classifiedWords.length - 1].matches.push(name);
    }
  });

  if (amountOfGroups >= classifiedWords.length) {
    //
    //
    // TODO : skip the balancing and just return the object
    //
    //

    return;
  }

  const getPossibleBreakingPoints = () => {
    let results = [];
    let accumulatedLengths = 0;

    const getNextCap = (index) =>
      Math.round((index / amountOfGroups) * listOfWords.length);

    for (let i = 0; i < classifiedWords.length; i++) {
      if (results.length === amountOfGroups - 1) {
        break;
      }

      const limit = getNextCap(results.length + 1);
      accumulatedLengths += classifiedWords[i].matches.length;

      if (accumulatedLengths > limit) {
        results.push([i - 1, i]);
      }
      if (accumulatedLengths === limit) {
        results.push([i]);
      }
    }

    return results;
  };

  const findMostBalancedIndexes = (listOfIndex) => {
    let results;
    let smallestDeviation = Infinity;

    const getWordListSize = (indexes) =>
      [...indexes, classifiedWords.length - 1].map((current, position) => {
        const start = position === 0 ? 0 : indexes[position - 1] + 1;
        let accumulated = 0;
        for (let i = start; i <= current; i++) {
          accumulated += classifiedWords[i].matches.length;
        }
        return accumulated;
      });

    const doCombo = (list, n = 0, current = []) => {
      if (n === list.length) {
        const currentDeviation = getStandardDeviation(getWordListSize(current));
        if (smallestDeviation > currentDeviation) {
          smallestDeviation = currentDeviation;
          results = current;
        }
      } else {
        list[n].forEach((item) => doCombo(list, n + 1, [...current, item]));
      }
    };

    doCombo(listOfIndex);
    return results;
  };

  const possibleBreakpoints = getPossibleBreakingPoints();
  let mostBalancedIndexes = findMostBalancedIndexes(possibleBreakpoints);

  let results = [];

  for (let loop = 0; loop < amountOfGroups; loop++) {
    const start = loop === 0 ? 0 : mostBalancedIndexes[loop - 1] + 1;
    const end =
      loop === amountOfGroups - 1
        ? classifiedWords.length - 1
        : mostBalancedIndexes[loop];
    results.push({
      start: classifiedWords[start].letter,
      end: classifiedWords[end].letter,
      matches: [].concat.apply(
        [],
        classifiedWords
          .slice(start, end + 1)
          .map((letterList) => letterList.matches)
      ),
    });
  }

  return results;
};
