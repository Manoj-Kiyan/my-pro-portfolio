import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space)", "sans-serif"], // Makes Space Grotesk the default
        display: ["var(--font-syne)", "sans-serif"], // Creates a special class for Syne
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // 🔴 ADDED KEYFRAMES: This powers the green laser scan animation!
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        scan: 'scan 3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;