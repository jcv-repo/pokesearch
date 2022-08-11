export const getFlavorText = (flavorTextEntries, language) => {
  const index = flavorTextEntries.findIndex(
    ({ language: entryLang }) => entryLang.name === language
  );
  return index === -1 ? null : flavorTextEntries[index].flavor_text;
};
