/** @type {import('tailwindcss').Config} */
import { THEME_COLORS } from "./src/config/themeConstants";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: THEME_COLORS.primary,
        "primary-container": THEME_COLORS.primaryContainer,
        surface: THEME_COLORS.surface,
        "surface-lowest": THEME_COLORS.surfaceLowest,
        "on-surface-variant": THEME_COLORS.onSurfaceVariant,
        secondary: THEME_COLORS.secondary,
        tertiary: THEME_COLORS.tertiary,
        border: THEME_COLORS.border,
        error: THEME_COLORS.error,
      },
    },
  },
  plugins: [],
};
