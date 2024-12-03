/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        edithAuthorImg:"url('assets/edithAuthoBG.jpeg')"

      },
      fontFamily:{
        "roboto":["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}