/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    // screens: {
    //   'xl': '1281px',
    // },
    corePlugins: {
      aspectRatio: false,
    },
    extend: {
      fontFamily: {
        'sans': ["Roboto"],
      },
      colors: {
        primary: "#96c342",
        "primary-75": "#a5d884",
        "primary-50": "#c2e4ac",
        "primary-25": "#e0f1d5",
        secondary: "#3863a2",
        "secondary-75": "#698ab9",
        "secondary-50": "#9ab0d0",
        "secondary-25": "#ccd7e7",
        neutral: "#3c3c3b",
        "neutral-75": "#727378",
        "neutral-50": "#a0a1a4",
        "neutral-25": "#cfcfd1",
        "base-content": "#3c3c3b",
        tertiary: "#df595b",
        "tertiary-75": "#e58479",
        "tertiary-50": "#eca79d",
        "tertiary-25": "#f4d1c8",
      },
      letterSpacing: {
        wide: '.125rem',
      },
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')],
};