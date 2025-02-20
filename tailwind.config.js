/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        bleu: {
          DEFAULT: "#0579be",
          sombre: "#03476e",
          transparent: "#0579BE80"
        },
        rouge: {
          DEFAULT: "#f44336"
        },
        orange: {
          DEFAULT: "#ff9800"
        },
        blanc: {
          DEFAULT: "#ffffff"
        },
        gris: {
          DEFAULT: "#cccccc",
          sombre: "#888888",
          clair: "#f5f5f5",
          transparent: "#cccccc60",
          desactive: "#6b7280"
        },
        bordure: {
          DEFAULT: "#8080805c"
        }
      },
      fontFamily: {
        "noto-sans-ui": ["NotoSansUI-Regular", "sans-serif"]
      },

      animation: {
        apparition: "apparition .25s ease"
      },

      transitionProperty: {
        opacity: "opacity"
      }
    }
  },
  plugins: []
};
