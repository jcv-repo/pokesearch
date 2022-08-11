export const isSelectionValid = (
  selection,
  optionCategories,
  showErrorInConsole = false
) => {
  let isValid = true;
  let errorMessage;

  for (const category in selection) {
    const value = selection[category];

    if (!Array.isArray(value)) {
      isValid = false;
      if (showErrorInConsole)
        errorMessage = `${value} in ${category} is not an array, every item in the selection must be an array`;
      break;
    }

    const indexInOptions = optionCategories.findIndex(
      ({ name }) => name === category
    );

    if (indexInOptions === -1) {
      isValid = false;
      if (showErrorInConsole)
        errorMessage = `${category} is not a valid category`;
      break;
    }

    const maxAllowed = optionCategories[indexInOptions].maxAllowed;
    if (value.length > maxAllowed) {
      isValid = false;
      if (showErrorInConsole)
        errorMessage = `${value} in ${category} exceeds the maximum amount of data allowed`;
      break;
    }
  }

  if (showErrorInConsole) console.error(errorMessage);
  return isValid;
};
