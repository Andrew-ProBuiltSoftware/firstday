/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Arial"],
      },
      colors: {
        mainBackground: "#0A1D37",
        button: "#65A1D7",
      },
    },
  },
  plugins: [],
};
