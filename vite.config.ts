/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import esLint from "vite-plugin-eslint";
import dts from "vite-plugin-dts";
import autoImport from "unplugin-auto-import/vite";
import sassDts from "vite-plugin-sass-dts";

/**
 * Resolve scss For sassDts
 */
function scssResolver(args: Array<string>, filename: string) {
  if (args[0] !== filename) {
    return;
  }

  return {
    file: `${filename.replace("@", resolve(__dirname, "src"))}.scss`,
  };
}

export default defineConfig({
  test: {
    include: ["./src/**/*.spec.ts"],
    environment: "happy-dom",
    deps: {
      inline: [
        "@material/material-color-utilities"
      ]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
    dedupe: ["vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        importer(...args) {
          return scssResolver(args, args[0]);
        },
      },
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "VueMaterialYou",
      fileName: (format) => `vue-material-you.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    esLint(),
    dts(),
    sassDts(),
    autoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts",
    }),
  ],
});
