import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import sharedPlugins from "./shared-plugins";

export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version)
  },
  build: {
    lib: {
      entry: resolve(__dirname, "../src/index.ts"),
      name: "VueMaterialYou",
      fileName: (format) => `vue-material-you.${format}.js`
    },
    rollupOptions: {
      external: ["vue", "vue-router"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter"
        }
      }
    }
  },
  plugins: [...sharedPlugins, dts()]
});
