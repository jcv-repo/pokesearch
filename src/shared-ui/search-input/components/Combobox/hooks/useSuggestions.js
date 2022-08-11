import { useRef } from "react";
import { findStringFromArrayWithLimit } from "#utils/findStringFromArrayWithLimit";

export const useSuggestions = (data, input, options, maxSuggestionCount) => {
  const suggestions = useRef([]);
  const suggestionTarget = useRef(input);

  const cleanInput = input.toLowerCase();

  // what are the suggestions:
  // we only gonna return the firsts results in each category
  // in case that there is more than the maximum amount of suggestions allowed
  // we gonna equally show the same amount of matches for each category
  //            (if dividing the categories is odd,
  //                categories declared first on the fetch get prioritized)
  //
  //              ... just a whatever algorithm to fill in here for the moment

  // TODO : settimeouts para no sobrecargar el cpu, esperar que el usuario
  //        deje de escribir

  const findSuggestions = () => {
    let results = [];

    if (cleanInput.trim().length === 0) {
      suggestions.current = [];
      suggestionTarget.current = "";
      return results;
    }

    const suggestTargetSize = suggestionTarget.current.length;
    if (
      suggestions.current.length === 0 &&
      cleanInput.trim().length > 1 &&
      suggestionTarget.current.slice(0, suggestTargetSize) ===
        cleanInput.slice(0, suggestTargetSize)
    ) {
      return results;
    }

    //
    //
    //

    let listsOfSuggestions = [];
    for (const entry of options) {
      const matches = findStringFromArrayWithLimit(
        data[entry.name],
        cleanInput.trim(),
        maxSuggestionCount
      );
      if (matches.length !== 0) {
        listsOfSuggestions.push({ category: entry.name, matches: matches });
      }
    }

    const criteriaCount = listsOfSuggestions.length;
    const accumulatedSum = (index) =>
      Math.round((index / criteriaCount) * maxSuggestionCount);

    for (let i = 0; i < criteriaCount; i++) {
      const suggestionsCount = accumulatedSum(i + 1) - accumulatedSum(i);
      const matchList = listsOfSuggestions[i];

      results.push(
        ...matchList.matches
          .slice(0, suggestionsCount)
          .map((match) => ({ category: matchList.category, match: match }))
      );
    }

    suggestions.current = results;
    suggestionTarget.current = cleanInput;

    return results;
  };

  return { findSuggestions };
};
