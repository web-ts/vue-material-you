/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import esLint from "vite-plugin-eslint";
import dts from "vite-plugin-dts";
import autoImport from "unplugin-auto-import/vite";
import sassDts from "vite-plugin-sass-dts";
import yaml from "@modyfi/vite-plugin-yaml";
import vitePluginRaw from "vite-plugin-raw";

/**
 * Resolve scss For sassDts
 */
function scssResolver(args: Array<string>, filename: string) {
  if (args[0] !== filename) {
    return;
  }

  return {
    file: `${filename.replace("@", resolve(__dirname, "src"))}.scss`
  };
}

export default defineConfig({
  define:{
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false
  },
  test: {
    globals: true,
    include: ["./src/**/*.spec.ts"],
    environment: "happy-dom",
    deps: {
      inline: ["@material/material-color-utilities"]
    },
    coverage: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    },
    dedupe: ["vue"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        importer(...args) {
          return scssResolver(args, args[0]);
        }
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: "VueMaterialYou",
      fileName: (format) => `vue-material-you.${format}.js`
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vitePluginRaw({
      match: /\.svg$/
    }),
    yaml(),
    esLint(),
    dts(),
    sassDts(),
    autoImport({
      imports: ["vue"],
      dts: "src/auto-imports.d.ts"
    })
  ]
});
