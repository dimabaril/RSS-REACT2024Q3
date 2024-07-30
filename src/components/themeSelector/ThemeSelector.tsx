import { useTheme } from "../../hooks/useTheme";
import "./ThemeSelector.scss";
import moon from "/src/assets/moon-svgrepo-com.svg";
import sun from "/src/assets/sun-svgrepo-com.svg";

const ThemeSelector = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={"theme-button"} onClick={toggleTheme}>
      {isDark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
    </div>
  );
};

export default ThemeSelector;
