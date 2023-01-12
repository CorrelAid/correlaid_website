/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        main: {
          "primary": "#96c342",
          "secondary": "#3863a2",
          "accent": "#1FB2A6",
          "neutral": "#3c3c3b",
          "neutral-content": "#fffbf7",
          "base-100":"#727375",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};