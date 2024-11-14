/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        bleu: {
          DEFAULT: "#0579be",
          sombre: "#03476e",
          transparent: "#0579BE80",
        },
        rouge: {
          DEFAULT: "#f44336",
        },
        blanc: {
          DEFAULT: "#ffffff",
        },
        gris: {
          DEFAULT: "#cccccc",
          sombre: "#888888",
          clair: "#f5f5f5",
        },
      },

      keyframes: {
        apparition: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        apparition: "apparition 0.5s ease-in-out",
      },

      transitionProperty: {
        opacity: "opacity",
      },
    },
  },
  plugins: [],
};
