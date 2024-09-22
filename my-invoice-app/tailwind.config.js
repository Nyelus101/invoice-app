/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg1': '#1E2139',
        'dark-bg2': '#252945',



        'custom-orange': '#f76205',
        'custom-orange-light': '#f2dacb',
        'custom-green': '#029940',
        'custom-green-light': '#c7f0d8',
        'custom-purple': '#7C5DFA',
        'custom-text': '#888EB0',
        'custom-bg': '#DFE3FA',
        'custom-logo1': '#7C5DFA',
        'custom-logo2': '#9277FF'
      },
    },
  },
  plugins: [],
}

