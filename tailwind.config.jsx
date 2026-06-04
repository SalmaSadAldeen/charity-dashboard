/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#735c00",
        "primary-container": "#fad564",
        "surface-container": "#f5ede0",
        "on-surface-variant": "#4d4636",
        tertiary: "#3b674c",
        border: "#d0c6b0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
