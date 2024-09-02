/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '320px',

      'md': '360px',

      'mdx': '460px',

      'mdl': '522px',

      'slg': '750px',

      'lg': '900px',

      'xl': '1000px',

      'xld': '1100px',

      '3xl': '1440px',
    },
    extend: {
      colors: {
        main: "#2E4C44",
        second: "#E0B77C"
      },
      height: {
        'screen-minus-80': 'calc(100vh - 80px)',
      },
    },
  },
  plugins: [],
};
