export const getGroupLabel = (start, end) =>
  start === end
    ? start.toUpperCase()
    : start.toUpperCase() + " - " + end.toUpperCase();
