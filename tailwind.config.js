/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/cupcake/src/**/*.{js,jsx,ts,tsx,html}",
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "nord",
      "light",
      "dark",
      "cupcake",
      "autumn",
      "pastel",
      "valentine"
    ],
  },
}

