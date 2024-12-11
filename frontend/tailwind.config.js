/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: "#D1E6FF",
          100: "#A3CDFF",
          200: "#4D9DFF",
          300: "#006CF0",
          400: "#004599",
          500: "#001C3F",
          600: "#001733",
          700: "#001024",
          800: "#000B19",
          900: "#00050A",
          950: "#000205"
        },
        'secondary': {
          50: "#E5FDFF",
          100: "#CCFBFF",
          200: "#99F6FF",
          300: "#66F2FF",
          400: "#33EEFF",
          500: "#00EAFF",
          600: "#00BBCC",
          700: "#008C99",
          800: "#005E66",
          900: "#002F33",
          950: "#001719"
        },
        'tertiary': {
          50: "#FFFCE5",
          100: "#FFF8CC",
          200: "#FFF199",
          300: "#FFEB66",
          400: "#FFE433",
          500: "#FFDE01",
          600: "#CCB100",
          700: "#998500",
          800: "#665800",
          900: "#332C00",
          950: "#191600"
        }
      }
    },
  },
  plugins: [],
}

