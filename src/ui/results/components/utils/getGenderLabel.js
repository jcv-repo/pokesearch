export const getGenderLabel = (genderValue) => {
  switch (genderValue) {
    case -1:
      return "These Pokemon are genderless";
    case 1:
      return "These Pokemon are always male";
    case 2:
      return "These Pokemon are commonly male";
    case 3:
      return "These Pokemon are more likely to be male";
    case 4:
      return "These Pokemon have equal chance of being male or female";
    case 6:
      return "These Pokemon are more likely to be female";
    case 7:
      return "These Pokemon are commonly female";
    case 8:
      return "These Pokemon are always female";
    default:
      return "These Pokemon maybe are some big enbies fr fr";
  }
};
