export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeType = typeof THEME[keyof typeof THEME];

