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
          DEFAULT: '#B8860B',  // Darker, richer gold
          light: '#D4AF37',    // Classic gold
          dark: '#996515',     // Deep antique gold
        },
        cream: {
          DEFAULT: '#FDF5E6',  // Old lace
          light: '#FFFAF0',    // Floral white
          dark: '#FAF0E6',     // Linen
        },
        navy: {
          DEFAULT: '#090985',  // Classic navy
          light: '#1B2B4D',    // Midnight blue
          dark: '#0F1729',     // Dark navy
        },
        stone: {
          DEFAULT: '#F5F5F5',  // White smoke
          light: '#FAFAFA',    // Almost white
          dark: '#E5E5E5',     // Light gray
        },
        champagne: {
          DEFAULT: '#F7E7CE',  // Champagne
          light: '#FFF8E7',    // Light champagne
          dark: '#E8D0A9',     // Dark champagne
        },
        burgundy: {
          DEFAULT: '#800020',  // Classic burgundy
          light: '#A3142D',    // Light burgundy
          dark: '#4A000F',     // Dark burgundy
        }
      },
      fontFamily: {
        avenir: ['AvenirNextLTPro', 'sans-serif'],
        caslon: ['ITCCaslon224StdMedium', 'serif'],
      },
    },
  },
  plugins: [],
};
