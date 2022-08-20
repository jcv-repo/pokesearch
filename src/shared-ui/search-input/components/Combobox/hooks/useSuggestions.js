import { useRef } from "react";
import { cleanString } from "#utils/cleanString";

export const useSuggestions = (data, input, options, maxSuggestionCount) => {
  const suggestions = useRef([]);
  const suggestionTarget = useRef(input);

  const cleanInput = cleanString(input);

  //
  //
  // TODO : settimeouts para no sobrecargar el cpu, esperar que el usuario
  //        deje de escribir
  //
  //

  const findSuggestions = () => {
    let results = [];

    if (cleanInput.length === 0) {
      suggestions.current = [];
      suggestionTarget.current = "";
      return results;
    }

    const suggestTargetSize = suggestionTarget.current.length;
    if (
      suggestions.current.length === 0 &&
      cleanInput.length > 1 &&
      suggestionTarget.current.slice(0, suggestTargetSize) ===
        cleanInput.slice(0, suggestTargetSize)
    ) {
      return results;
    }

    //
    // Find matches
    //

    let listsOfSuggestions = [];

    for (const category of options) {
      let matches = {
        // Priorities
        high: [],
        low: [],
      };

      for (const item of data[category.name]) {
        if (matches.high.length >= maxSuggestionCount) {
          break;
        }

        const cleanItem = cleanString(item);

        // Lowest priority matching first
        if (cleanItem.includes(cleanInput)) {
          // Check if it's high priority then
          const isHighPriority = cleanItem.startsWith(cleanInput);

          if (isHighPriority) {
            matches.high.push(item);
          } else {
            if (
              // lil optimese
              matches.high.length + matches.low.length <=
              maxSuggestionCount
            ) {
              matches.low.push(item);
            }
          }
        }
      }

      if (matches.length !== 0) {
        listsOfSuggestions.push({
          category: category.name,
          matches: { high: matches.high, low: matches.low },
        });
      }
    }

    //
    // Formatting matches
    //

    const sortSuggestionsByLength = (priority) => {
      listsOfSuggestions.sort(({ matches: a }, { matches: b }) => {
        if (a[priority].length > b[priority].length) {
          return 1;
        }
        if (a[priority].length < b[priority].length) {
          return -1;
        }
        return 0;
      });
    };

    const categoryCount = listsOfSuggestions.length;

    const addToResults = (priority) => {
      sortSuggestionsByLength(priority);

      for (let i = 0; i < categoryCount; i++) {
        const maxCategorySuggestions = Math.round(
          (1 / (categoryCount - i)) * (maxSuggestionCount - results.length)
        );
        const matchList = listsOfSuggestions[i];

        if (maxCategorySuggestions > 0) {
          results.push(
            ...matchList.matches[priority]
              .slice(0, maxCategorySuggestions)
              .map((match) => ({ category: matchList.category, match: match }))
          );
        }
      }
    };

    addToResults("high");
    if (maxSuggestionCount > results.length) {
      addToResults("low");
    }

    //
    //
    //

    suggestions.current = results;
    suggestionTarget.current = cleanInput;

    return results;
  };

  return { findSuggestions };
};
