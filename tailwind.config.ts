import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#2563EB",
        "electric-blue-light": "#3B82F6",
        "electric-blue-dark": "#1D4ED8",
        "dark-bg": "#0a0a0a",
        "dark-card": "#111111",
        "dark-card-hover": "#1a1a1a",
        "dark-border": "#222222",
        "text-primary": "#f5f5f5",
        "text-secondary": "#a0a0a0",
        "text-muted": "#666666",
      },
      fontFamily: {
        satoshi: ["Satoshi", "Inter", "sans-serif"],
      },
      spacing: {
        section: "10vh",
      },
      animation: {
        "marquee-left": "marquee-left 30s linear infinite",
        "marquee-right": "marquee-right 30s linear infinite",
        "scroll-indicator": "scroll-indicator 2s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "scroll-indicator": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(10px)", opacity: "0.5" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
