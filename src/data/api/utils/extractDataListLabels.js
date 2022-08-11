export const extractDataListLabels = (data, typeOfData) => {
  if (typeof data !== "object" || data === null) {
    throw new Error(
      `${data} must be a piece of Pokemon data taken from the context`
    );
  }

  const getGenerationFromURL = (url) => {
    const regex = new RegExp(
      `${process.env.REACT_APP_POKEAPI_URL}(?:generation)/(\\d+)`,
      "gi"
    );
    const match = regex.exec(url);

    return match === null ? null : match[1];
  };

  switch (typeOfData) {
    case "pokemon":
      return data.map((entry) => entry.name);

    case "type":
      return data.map((entry) => entry.name);

    case "ability":
      return data.map((entry) => entry.name);

    case "generation":
      return data.map((entry) => getGenerationFromURL(entry.url));

    default:
      throw new Error(
        `${typeOfData} is not a valid type of data to extract information`
      );
  }
};
