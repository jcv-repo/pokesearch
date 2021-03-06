const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-one": "#acf6a0",
        "primary-two": "#51f3ea",
        "on-primary": "#ffffff",
        "secondary-one": "#6e94f4",
        "secondary-two": "#7b5dfa",
        "on-secondary": "#ffffff",
        "tertiary-color": "#ffffff",
        "on-tertiary": "#333650",
        "type-normal": "#4ab255",
        "type-grass": "#62c66c",
        "type-fire": "#e0554c",
        "type-water": "66b8dd",
        "type-fighting": "#97433e",
        "type-flying": "#a69ce0",
        "type-poison": "#9b63ae",
        "type-ground": "#cdb370",
        "type-rock": "#ab886b",
        "type-bug": "#afc570",
        "type-ghost": "#67648d",
        "type-electric": "#d8c303",
        "type-psychic": "#ec6e8c",
        "type-ice": "#2dc2b9",
        "type-dragon": "#9c79e7",
        "type-dark": "6a564a",
        "type-steel": "#a6abb4",
        "type-fairy": "#ea91e6",
      },
      fontFamily: {
        roboto: "Roboto, sans-serif",
        "roboto-condensed": "Roboto Condensed, sans-serif",
      },
      textShadow: {
        DEFAULT: "1px 1px 1px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     colors: {
//       white: "#ffffff",
//       slate: "#64748b",
//       "lime-sky": "#acf6a0",
//       "sky-blue": "#51f3ea",
//       "soft-blue": "#6e94f4",
//       "pure-violet": "#7b5dfa",
//       gray: "#4ab255",
//       green: "#62c66c",
//       red: "#e0554c",
//       blue: "66b8dd",
//       brown: "#97433e",
//       "sky-violet": "#a69ce0",
//       purple: "#9b63ae",
//       "dirt-yellow": "#cdb370",
//       "light-brown": "#ab886b",
//       "light-green": "#afc570",
//       "pale-purple": "#67648d",
//       "shallow-yellow": "#d8c303",
//       "redish-pink": "#ec6e8c",
//       "ice-blue": "#2dc2b9",
//       lavanda: "#9c79e7",
//       "dark-brown": "6a564a",
//       "light-slate": "#a6abb4",
//       pink: "#ea91e6",
//     },
//     fontFamily: {
//       roboto: "Roboto, sans-serif",
//       "roboto-condensed": "Roboto Condensed, sans-serif",
//     },
//   },
//   plugins: [],
// };
