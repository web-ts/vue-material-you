import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  extract: {
    include: ["docs/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"]
  }
});
