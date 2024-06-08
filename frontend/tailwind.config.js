/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "glow-dark": "0 0 16px #d6d3d1",
        "glow-darker": "0 0 16px #a8a29e",
        "glower-dark": "0 0 16px #78716c"
      }
    },
    aspectRatio: {
      'book': '1 / 1.5',
    }
  },
  plugins: [
  ]


}
