// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#f76205',
        'custom-orange-light': '#f2dacb',
        'custom-green': '#029940',
        'custom-green-light': '#c7f0d8',
        'custom-purple': '#7C5DFA',
        'custom-text': '#888EB0'
      },
    },
  },
  plugins: [],
}

