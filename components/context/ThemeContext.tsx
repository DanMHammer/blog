import { createContext, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export type ThemeContextType = {
  className: string;
  variant: "light" | "dark";
  contrastVariant: string;
  bgClass: string;
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  outlineButton: string;
  outlineButtonContrast: string;
  github: string;
  linkedin: string;
  mail: string;
  imageBackgroundColor: string;
  toggleTheme?: (e: any) => void;
};

const themes: { [key: string]: ThemeContextType } = {
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
    github: "/images/marks/GitHub-Mark-64px.png",
    linkedin: "/images/marks/linkedin-64.png",
    mail: "/images/marks/mail-dark-64.png",
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
    github: "/images/marks/GitHub-Mark-Light-64px.png",
    linkedin: "/images/marks/linkedin-light-64.png",
    mail: "/images/marks/mail-light-64.png",
    imageBackgroundColor: "#292b2c",
  },
};

const ThemeContext = createContext<ThemeContextType>(themes.dark);

const ThemeContextProvider = ({ children }: any) => {
  const [themeStorage, setThemeStorage] = useLocalStorage("theme", "dark");
  const [theme, setTheme] = useState<ThemeContextType>({
    ...themes[themeStorage],
  });

  const toggleTheme = (e: any) => {
    e.preventDefault();
    if (theme.className === "lightmode") {
      setTheme({ ...themes.dark, toggleTheme });
      setThemeStorage("dark");
    } else {
      setTheme({ ...themes.light, toggleTheme });
      setThemeStorage("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
