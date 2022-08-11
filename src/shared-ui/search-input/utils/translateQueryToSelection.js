import { getDeconstructedSearch } from "#utils/getDeconstructedSearch";

export const translateQueryToSelection = (query) => {
  let result = {};
  getDeconstructedSearch(query).forEach(({ category, match }) => {
    result[category]
      ? result[category].push(match)
      : (result[category] = [match]);
  });

  return result;
};
