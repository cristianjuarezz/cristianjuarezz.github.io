/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prim': '#00A47C',
        'sec': '#002EA4',
        'background': '#1D1D1D'
      }
    },
  },
  plugins: [],
}
