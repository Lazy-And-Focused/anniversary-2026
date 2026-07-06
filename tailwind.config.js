/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'accent-start': '#f97316',
        'accent-end': '#d946ef',
        'bg-secondary': '#121218',
      },
    },
  },
  plugins: [],
};
