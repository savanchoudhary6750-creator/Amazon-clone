/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#ff9900',
          blue: '#131921',
          lightGray: '#eaeded',
          darkGray: '#37475a',
          red: '#b12704',
          gold: '#ffd814',
          goldHover: '#f3a847',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      boxShadow: {
        amazon: '0 2px 10px rgba(0, 0, 0, 0.1)',
        'amazon-lg': '0 12px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
