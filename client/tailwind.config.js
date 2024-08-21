/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
        logo: ["Italianno", "sans-serif"],
        logotwo: ["Italiana", "sans-serif"],
      },
    },
  },
  plugins: [],
};
