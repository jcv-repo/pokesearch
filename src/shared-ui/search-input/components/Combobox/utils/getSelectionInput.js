export const getSelectionInput = (selection) => {
  return selection.reduce((acum, entry) => {
    const match = entry.match.toLowerCase();
    const category = entry.category.toLowerCase();
    const acumValue = acum[category];
    const newValue = acumValue ? [...acumValue, match] : [match];
    return {
      ...acum,
      [category]: newValue,
    };
  }, {});
};
