/// <reference types="vitest" />

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sharedPlugins from "./shared-plugins";

export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false
  },
  test: {
    globals: true,
    include: ["../src/**/*.spec.ts"],
    environment: "happy-dom",
    coverage: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    },
    deps: {
      inline: ["@material/material-color-utilities"]
    }
  },
  plugins: [...sharedPlugins, vue()]
});
