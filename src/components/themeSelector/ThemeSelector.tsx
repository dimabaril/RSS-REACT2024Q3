import Image from "next/image";

import { useTheme } from "../../hooks/useTheme";
import "./ThemeSelector.scss";
import moon from "/src/assets/moon-svgrepo-com.svg";
import sun from "/src/assets/sun-svgrepo-com.svg";

const ThemeSelector = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={"theme-button"} onClick={toggleTheme}>
      {isDark ? <Image src={moon} alt="moon" /> : <Image src={sun} alt="sun" />}
    </div>
  );
};

export default ThemeSelector;
