import { createContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const themes = {
    light: {
      className: "lightmode",
      variant: "light",
      contrastVariant: "dark",
      bgClass: "bg-light",
      textColor: "black",
      borderColor: "dark",
      backgroundColor: "",
      outlineButton: "outline-info",
      outlineButtonContrast: "outline-dark",
      github: "/images/GitHub-Mark-64px.png",
      linkedin: "/images/linkedin-64.png",
      mail: "/images/mail-dark-64.png",
      imageBackgroundColor: "#525675",
    },
    dark: {
      className: "darkmode",
      variant: "dark",
      contrastVariant: "light",
      bgClass: "bg-dark",
      textColor: "white",
      borderColor: "light",
      backgroundColor: "#292b2c",
      outlineButton: "outline-dark",
      outlineButtonContrast: "outline-light",
      github: "/images/GitHub-Mark-Light-64px.png",
      linkedin: "/images/linkedin-light-64.png",
      mail: "/images/mail-light-64.png",
      imageBackgroundColor: "#292b2c",
    },
  };

  const [themeStorage, setThemeStorage] = useLocalStorage("theme", "dark");
  const [theme, setTheme] = useState(themes[themeStorage]);

  const toggleTheme = (e) => {
    e.preventDefault();
    if (theme.className === "lightmode") {
      setTheme(themes.dark);
      setThemeStorage("dark");
    } else {
      setTheme(themes.light);
      setThemeStorage("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
