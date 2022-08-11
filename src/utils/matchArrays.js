export const matchArrays = (...args) => {
  if (args.length < 2) {
    return args[0];
  }

  for (const argument of args) {
    if (!Array.isArray(argument)) {
      throw new Error(`${argument} is not an Array`);
    }
  }

  return args.reduce((accumulated, current, index) =>
    index === 0
      ? args[0]
      : accumulated.filter((item) => current.indexOf(item) !== -1)
  );
};
