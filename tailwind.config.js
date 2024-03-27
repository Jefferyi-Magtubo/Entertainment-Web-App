/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'red' : '#FC4747',
        'vDarkBlue' : '#10141E',
        'darkBlue' : '#161D2F',
        'lightBlue' : '#5A698F', 
      },
      fontFamily: {
        'outfit': ["Outfit", 'sans-serif']
      },
      screens: {
        'xs' : '320px',
        'smh' : '400px'
      },
      fontSize: {
        'xxs' : '.5rem'
      },
      width: {
        '45%' : '45%',
        '32%' : '32%'
      }
    },
  },
  plugins: [],
}

