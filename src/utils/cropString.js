const cropString = (string, from, to) => {
  return string.substring(0, from) + string.substring(to);
};

export default cropString;
