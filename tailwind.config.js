/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-1": "#5457b6",
        "primary-2": "#ed6468",
        "primary-3": "#c3c4ef",
        "primary-4": "#ffb8bb",
        "neutral-1": "#324152",
        "neutral-2": "#67727e",
        "neutral-3": "#eaecf1",
        "neutral-4": "#f5f6fa",
        "neutral-5": "#ffffff",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
