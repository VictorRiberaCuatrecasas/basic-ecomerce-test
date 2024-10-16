const colors = require("tailwindcss/colors");

// Tailwind CSS theme configuration for an eCommerce webshop about electronics and clothing
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        primary: ["Rubik", "sans-serif"],
      },
      colors: {
        primary: {
          lighter: colors.blue["400"], // Light blue for highlights
          DEFAULT: "#1E40AF", // A strong blue for primary elements
          darker: "#1E3A8A", // A darker blue for accents
        },
        secondary: {
          lighter: colors.green["400"], // Light green for softer clothing items
          DEFAULT: colors.green["500"], // Vibrant green for buttons
          darker: colors.green["600"], // Dark green for hover states
        },
        accent: {
          DEFAULT: colors.orange["500"], // Orange for promotions/special offers
        },
        neutral: {
          lighter: colors.neutral["300"], // Light neutral for backgrounds and cards
          DEFAULT: colors.neutral["600"], // Mid-tone neutral for text
          darker: colors.neutral["800"], // Darker neutral for headers or footers
        },
        background: {
          DEFAULT: "#F8FAFC", // A light background for a clean look
          darker: "#D3E8F2"
        },
      },
      container: {
        center: true,
        padding: '1rem', // Increased padding for better spacing
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
