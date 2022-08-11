export const getSelectionInput = (selection) => {
  return selection.reduce((acum, entry) => {
    const label = entry.label.toLowerCase();
    const category = entry.category.toLowerCase();
    const acumValue = acum[category];
    const newValue = acumValue ? [...acumValue, label] : [label];
    return {
      ...acum,
      [category]: newValue,
    };
  }, {});
};
