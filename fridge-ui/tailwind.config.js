/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Matches all .js, .jsx, .ts, and .tsx files in the `src` folder and subfolders.
    "./src/components/AddItemForm.jsx",
    "./src/components/ItemList.jsx",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          700: "#B91C1C",
        },
        green: {
          700: "#15803D",
        },
      },
    },
  },
  plugins: [],
};
