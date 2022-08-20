import { ModalAddType } from "#shared-ui/modals/ModalAddType";
import { ModalAddAbility } from "#shared-ui/modals/ModalAddAbility";
// import { ModalAddGeneration } from "#shared-ui/modals/ModalAddGeneration";

export const config = {
  maxSuggestionCount: 8,

  placeholderMessage: "Add a criteria or type here something",

  loadingMessage: "Wait a moment...",

  noMatchesMessage: "Nothing found, try something different",

  categories: [
    // { name: "pokemon", priority: "top", selectable: false },
    { name: "type", maxAllowed: 2 },
    { name: "ability" },
    // { name: "generation" },
  ],

  addMenu: [
    {
      category: "type",
      label: "Add Type",
      dialog: ModalAddType,
    },
    {
      category: "ability",
      label: "Add Ability",
      dialog: ModalAddAbility,
    },
    /*
    {
      category: "generation",
      label: "Add Generation",
      dialog: ModalAddGeneration,
    },
    */
  ],
};
