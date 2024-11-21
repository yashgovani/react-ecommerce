/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        "soft-yellow": "#fff38a",
        "muted-pink": "#d87984",
        lavender: "#c77ffc",
        "pale-lavender": "#eeebfc",
        "rich-pink": "#d71d52",
        "dark-brown": "#0d0302",
        "muted-brown": "#6a4f50",
        "deep-red": "#87020c",
      },
    },
  },
  plugins: [require("daisyui")],
};
