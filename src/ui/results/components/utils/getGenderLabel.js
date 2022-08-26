export const getGenderLabel = (genderValue) => {
  switch (genderValue) {
    case -1:
      return "These Pokémon are genderless";
    case 0:
      return "These Pokémon are always male";
    case 1:
      return "These Pokémon are vastly male";
    case 2:
      return "These Pokémon are commonly male";
    case 3:
      return "These Pokémon are more likely to be male";
    case 4:
      return "These Pokémon have equal chance of being male or female";
    case 5:
      return "These Pokémon are more likely to be female";
    case 6:
      return "These Pokémon are commonly female";
    case 7:
      return "These Pokémon are vastly female";
    case 8:
      return "These Pokémon are always female";
    default:
      return "These Pokémon's gender is unknown";
  }
};
