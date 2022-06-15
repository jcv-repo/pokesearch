import { useState, useEffect, useRef } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import { getUrlParams } from "../helpers/GetUrlParams";
import { ThemeContext, themes, getUserTheme } from "../styles/themes";
import SearchForm from "./SearchForm";
import "../styles/global.css";

const Page = () => {
  const [theme, setTheme] = useState(getUserTheme());
  const history = useHistory();

  const hasUserSwitchedThemes = useRef(false);
  const toggleTheme = () => {
    hasUserSwitchedThemes.current = true;
    setTheme(theme.name === themes.dark.name ? themes.light : themes.dark);
  };

  useEffect(() => {
    if (hasUserSwitchedThemes.current && localStorage.getItem !== theme.name) {
      localStorage.setItem("theme", theme.name);
    }
    Object.keys(theme.properties).map((key) => {
      const value = theme.properties[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  return (
    <Switch>
      <Route path="/">
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <SearchForm />
        </ThemeContext.Provider>
      </Route>
    </Switch>
  );
};

export default Page;
