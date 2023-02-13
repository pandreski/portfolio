/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-open-sans)', 'Helvetica', 'sans-serif'],
      serif: ['var(--font-dm-serif-display)', 'serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      primary: '#3FE198',
      secondary: '#00C4EE',
      'deep-gray': '#333',
      'deep-green': '#07403F',
      'sky-blue': '#EBFBFA'
    },
    extend: {
      screens: {
        '2xl': '1400px'
      }
    }
  },
  plugins: [],
}
