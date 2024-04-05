import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        public: ["var(--public-sans)"],
        sugar: ["var(--more-sugar)"],
      },
      colors: {
        primary: "#19676b",
      },
    },
  },
  plugins: [],
}
export default config
