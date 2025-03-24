/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      heading: ["Raleway", "sans-serif"],
      body: ["Lora", "serif"],
    },
    extend: {
      colors: {
        // Primary palette based on the golden/beige tones in your image
        primary: {
          DEFAULT: "#C4A77D", // Rich golden beige as seen in wave pattern
          light: "#DBC8A9",
          dark: "#9C7B51",
          100: "#F5EFE5",
          200: "#EAE0CE",
          300: "#DBC8A9",
          400: "#C4A77D",
          500: "#9C7B51",
          600: "#7D5F32",
          700: "#604A29",
          800: "#463620",
          900: "#2D2318",
        },
        // Secondary accent colors for highlights and contrast
        secondary: {
          DEFAULT: "#506789", // Deep blue for contrast with the warm primary
          light: "#8EA3C4",
          dark: "#334466",
        },
        // Tertiary color for additional accents
        tertiary: {
          DEFAULT: "#32936F", // Green to represent athletic performance
          light: "#64C4A1",
          dark: "#1E6B50",
        },
        // Neutral palette for text and backgrounds
        neutral: {
          DEFAULT: "#2D2D2D",
          light: "#F9F9F9",
          medium: "#7A7A7A",
          dark: "#1A1A1A",
        },
        // Status colors
        success: "#32936F",
        error: "#D64550",
        warning: "#F9C74F",
        info: "#4D96FF",
        disabled: "#B5B5B5",
      },
      backgroundColor: {
        card: "#F8F5F1",
        highlight: "rgba(196, 167, 125, 0.15)",
        overlay: "rgba(45, 35, 24, 0.75)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        medium: "0 6px 30px rgba(0, 0, 0, 0.12)",
        strong: "0 8px 40px rgba(0, 0, 0, 0.16)",
      },
      backgroundImage: {
        "wave-pattern": "url('/assets/images/wave-pattern.svg')",
        "hero-gradient":
          "linear-gradient(to right, rgba(196, 167, 125, 0.8), rgba(156, 123, 81, 0.6))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-right": "slideRight 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
