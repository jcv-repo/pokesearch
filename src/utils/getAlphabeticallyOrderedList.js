export const getAlphabeticallyOrderedList = (listOfWords) => {
  let mappedList = listOfWords.map((name, index) => ({
    name: name.toLowerCase(),
    index: index,
  }));

  mappedList.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return mappedList.map((item) => listOfWords[item.index]);
};
