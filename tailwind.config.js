/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        hero : "url('../public/weatherrrr 1.svg')",    
      },
    },
  },
  plugins: [],
}

