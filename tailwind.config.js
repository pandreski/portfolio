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
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      'deep-gray': 'rgb(var(--color-deep-gray) / <alpha-value>)',
      'deep-green': 'rgb(var(--color-deep-green) / <alpha-value>)',
      'sky-blue': 'rgb(var(--color-sky-blue) / <alpha-value>)'
    },
    extend: {
      screens: {
        '2xl': '1400px'
      }
    }
  },
  plugins: [],
}
