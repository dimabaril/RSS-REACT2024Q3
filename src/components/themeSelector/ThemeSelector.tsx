import { useTheme } from "../../hooks/useTheme";

const ThemeSelector = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {isDark ? "Dark" : "Light"} Theme
    </button>
  );
};

export default ThemeSelector;
