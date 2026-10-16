import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,md,mdx,astro}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,md,mdx,astro}",
    "./src/components/**/*.{js,ts,jsx,tsx,md,mdx,astro}",
    "./src/app/**/*.{js,ts,jsx,tsx,md,mdx,astro}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kdamthmorpro: ['var(--font-kdam)'],
      },
      colors: {
        youth: "#246476",
        notion: "#7DAE41",
      }
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
