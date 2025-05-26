import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react"; // 👈 plugin oficial

const config: Config = {
  darkMode: "class", // HeroUI trae light/dark
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}", // si usas src/
    // ¡imprescindible!: dile a Tailwind que escanee HeroUI en node_modules
    "./node_modules/@heroui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}, // tus overrides aquí
  },
  plugins: [
    heroui(), // activa tokens + utilidades
  ],
};

export default config;
