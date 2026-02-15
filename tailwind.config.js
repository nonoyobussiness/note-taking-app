/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Noto Serif", "ui-serif", "Georgia", "serif"],
        mono: ["Source Code Pro", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
