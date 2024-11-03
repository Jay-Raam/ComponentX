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
      animation: {
        wave: "wave 1s infinite",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
