/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: '"K2D", sans-serif;',
      },
      backgroundImage: {
        "hero-pattern": "url('../assets/background.png')",
      },
    },
  },
  plugins: [],
};
