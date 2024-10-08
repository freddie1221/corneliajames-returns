/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#f2d675',
          dark: '#b8860b',
        },
      },
      fontFamily: {
        avenir: ['AvenirNextLTPro', 'sans-serif'],
        caslon: ['ITCCaslon224StdMedium', 'serif'],
      },
    },
  },
  plugins: [],
};
