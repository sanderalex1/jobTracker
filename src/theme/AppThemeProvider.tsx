import { ThemeProvider, CssBaseline } from "@mui/material";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
  children: React.ReactNode;
}

type ThemeModeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(
  undefined,
);

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used inside AppThemeProvider");
  }
  return context;
};

export const AppThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeModeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline /> {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
