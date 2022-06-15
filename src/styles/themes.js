import React from "react";

const themes = {
  light: {
    name: "Light-theme",
    properties: {
      "--background": "#ffffff",
      "--text": "#161616",
      "--header": "#f6f6f6",
      "--icon": "#00000060",
      "--button": "#e0e0e0",
      "--buttonDetails": "#ffffff",
      "--highlight": "#94cc66",
      "--inputBg": "#ffffff",
      "--featuredBg": "#232323",
      "--featuredTxt": "#f1f1f1",
      "--featuredHighlightBg": "#3d3d3d",
      "--featuredDecoration": "#7d7c7c",
    },
  },
  dark: {
    name: "Dark-theme",
    properties: {
      "--background": "#222222",
      "--text": "#f1f1f1",
      "--header": "#161616",
      "--icon": "#ffffff90",
      "--button": "#2e2e2e",
      "--buttonDetails": "#ffffff",
      "--highlight": "#94cc66",
      "--inputBg": "#232323",
      "--featuredBg": "#161616",
      "--featuredTxt": "#f1f1f1",
      "--featuredHighlightBg": "#3d3d3d",
      "--featuredDecoration": "#7d7c7c",
    },
  },
};

const ThemeContext = React.createContext(themes.light);

const getUserTheme = () => {
  const localStorageTheming = localStorage.getItem("theme");
  if (localStorageTheming) {
    return localStorage.getItem("theme") === themes.dark.name
      ? themes.dark
      : themes.light;
  } else {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? themes.dark
      : themes.light;
  }
};

export { ThemeContext, themes, getUserTheme };
