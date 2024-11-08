/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        bleu: {
          DEFAULT: "#0579be",
          sombre: "#03476e",
        },
        rouge: {
          DEFAULT: "#f44336",
        },
        blanc: {
          DEFAULT: "#ffffff",
        },
        gris: {
          DEFAULT: "#cccccc",
        },
      },

      keyframes: {
        "apparition-menu": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "apparition-menu": "apparition-menu 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
