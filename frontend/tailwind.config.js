/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14121A",
        blush: "#F5E8DF",
        sand: "#F1E2D2",
        coral: "#E67164",
        moss: "#7A8F7B",
      },
      boxShadow: {
        card: "0 24px 60px -40px rgba(20, 18, 26, 0.6)",
      },
    },
  },
  plugins: [],
};
