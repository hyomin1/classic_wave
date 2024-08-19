/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-colors-moviebox-white": "var(--brand-colors-moviebox-white)",
        "x-8": "var(--x-8)",
      },
    },
  },
  plugins: [],
};