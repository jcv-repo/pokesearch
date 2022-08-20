export const getFlavorText = (flavorTextEntries, language) => {
  let index = -1;
  for (let i = flavorTextEntries.length - 1; i > 0; i--) {
    if (flavorTextEntries[i].language.name === language) {
      index = i;
      break;
    }
  }
  return index === -1 ? null : flavorTextEntries[index].flavor_text;
};
