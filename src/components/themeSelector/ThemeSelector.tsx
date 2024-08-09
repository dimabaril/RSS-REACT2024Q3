import Image from "next/image";

import { useTheme } from "../../hooks/useTheme";
import "./ThemeSelector.scss";
import moon from "/src/assets/moon-svgrepo-com.svg";
import sun from "/src/assets/sun-svgrepo-com.svg";

const ThemeSelector = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className={"theme-button"} onClick={toggleTheme}>
      {isDark ? (
        <Image src={moon} width={50} height={50} priority={false} alt="moon" />
      ) : (
        <Image src={sun} width={50} height={50} priority={false} alt="sun" />
      )}
    </button>
  );
};

export default ThemeSelector;
