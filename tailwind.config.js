/** @type {import('tailwindcss').Config} */
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
    extend: {},
  },
  plugins: [],
}
