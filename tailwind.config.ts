import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ha:"#252525"
      },
      height: {
        custom: "calc(100vh - 60px)",
      },
      keyframes: {
        "appears-from-top": {
          from: { transform: "translateY(-45%)", opacity: "0.4" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "custom-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "25%": {
            opacity: "0.7",
            transform: "scale(1.1)",
          },
          "50%": {
            opacity: "0.3",
            transform: "scale(1.2)",
          },
          "75%": {
            opacity: "0.7",
            transform: "scale(1.1)",
          },
        },
        "slide-in-out": {
          "0%, 100%": { transform: "translateX(-10px)", opacity: 0 },
          "50%": { transform: "translateX(10px)", opacity: 1 },
        },
        "spin-and-fade": {
          "0%": { transform: "rotate(0deg)", opacity: 0 },
          "50%": { transform: "rotate(180deg)", opacity: 1 },
          "100%": { transform: "rotate(360deg)", opacity: 0 },
        },
      },
      animation: {
        "appears-from-top": "appears-from-top .5s ease-in forwards",
        "custom-pulse":
          "custom-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in-out": "slide-in-out 1s ease-in-out infinite alternate",
        "spin-and-fade": "spin-and-fade 2s linear infinite",
      },
    },
  },
} satisfies Config;
