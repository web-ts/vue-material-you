import { defineConfig } from "vite-plugin-windicss";
import { tailwindColors } from "./src/color/utilities/tailwind";

export default defineConfig({
  extract: {
    include: ["docs/**/*.{vue,html,jsx,tsx}", "playground/**/*.{vue,html,jsx,tsx}", "configs/**/*.ts"],
    exclude: ["node_modules", ".git"]
  },
  theme: {
    colors: tailwindColors
  }
});
