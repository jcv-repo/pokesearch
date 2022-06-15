const LightOrDarkThemeToggle = ({ theme, toggleTheme }) => (
  <div
    id="theme-toggle"
    className={theme.name.toLowerCase()}
    onClick={toggleTheme}
  >
    <div></div>
  </div>
);
export default LightOrDarkThemeToggle;
