import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#f2c744",
          soft: "#f6d97a",
          deep: "#c9971f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
