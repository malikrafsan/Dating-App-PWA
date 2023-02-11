import React, { createContext, useState, } from "react";

import {  THEME, ThemeType } from "../types";

interface IThemeProviderProps {
  children: React.ReactNode;
}

interface IThemeContext {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const defaultValue = {
  theme: THEME.LIGHT,
  setTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(defaultValue);

const ThemeProvider = (props: IThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(defaultValue.theme);

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    </>
  );
};

export default {
  ThemeContext,
  ThemeProvider,
};
