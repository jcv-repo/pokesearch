export const getStateErrorMessageWithStatus = (status) => {
  if (status >= 400 && status < 500) {
    switch (status) {
      case 404:
        return "Nothing was found in the database, try searching something different";

      case 444:
        return "Couldn't connect to the database. Are you still connected to internet?";

      default:
        return "A connection error";
    }
  }

  return "An unknown error ocurred";
};
