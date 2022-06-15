const getPronounCheck = (gender, useNeutralPronounForAllNonBinaries = true) => {
  if (typeof gender === "string") {
    switch (gender.toLowerCase()) {
      case "male":
        return "He/Him";
      case "female":
        return "She/Her";
      default:
        if (useNeutralPronounForAllNonBinaries) return "They/Them";
        else return null;
    }
  } else {
    throw TypeError(gender + " is not a String");
  }
};

export default getPronounCheck;
