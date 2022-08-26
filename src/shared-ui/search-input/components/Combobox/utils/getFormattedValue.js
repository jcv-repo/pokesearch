import { toTitleCase } from "#utils/toTitleCase";

export const getFormattedValue = (category, match) => ({
  match: toTitleCase(match),
  category: toTitleCase(category),
});
