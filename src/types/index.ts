export const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type GeoLocation = {
  latitude: number;
  longitude: number;
}

export type ThemeType = typeof THEME[keyof typeof THEME];

