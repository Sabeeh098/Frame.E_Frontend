/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        'yatra-one': ['Yatra One', 'sans'],
        'garamond': ['Garamond', 'serif'],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes:  ["light"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    
  },
  
}