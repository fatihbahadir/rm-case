/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        creepster: ["Creepster", "system-ui"],
        nunito: ["Nunito", 'sans-serif']
      },
      colors: {
        green: '#2BB0C8',
        themeYellow: '#f0e14a'
      }
    },
  },
  plugins: [],
}