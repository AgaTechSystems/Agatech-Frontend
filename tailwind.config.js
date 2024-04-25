/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      NeueMachina:['NeueMachina'],
      Manjari:['Manjari'],
      Audiowide:['Audiowide'],
      Acme:["Acme"],
      RussoOne:['RussoOne'],
      Twobit:["Twobit"],
      Baseneue:["Baseneue"],
      Ruberoid:["Ruberoid"]


  
      },
      
    extend: {
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#0b080d',
        "gray7":"#87868c",
        'gray-light': '#d3dce6',
         "grayDark":' #0E1823',
         "darkbg":"#090F15",
         "grayborder":"#DCDCDC",
         "darktext":"#667D94",
         "loadbg":"#9d9d9d",
         "darkbox":"#0C1621",
         "black":"#000000",
         "darkGraytext":"#667D94",
         "lightGray":"#A5BBD0"
      },
    },
    screens: {
      'smPro': {'min': '430px'},
      'phone': {'max': '500px'},
      'minphone': {'min': '500px'},
      'middlePro': {'max': '370px'},
      'doublesm': {'max': '330px'},
      'sm': {'min': '640px', 'max': '767px'},
       'mdPro':{'min': '640px'},
      'esm': {'max': '767px'},
      'gridBox': {'min': '1110px'},
      'bigPhone':{'max': '770px'},
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'sxl':{'max': '1020px'},
      'xl': '1280px',
      '2xl': '1300px',
      "bigPc":{'min': '1700px'}
    },
  },
  plugins: [],
}




