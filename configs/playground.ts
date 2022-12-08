import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sharedPlugins from "./shared-plugins";

export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false
  },
  plugins: [...sharedPlugins, vue()]
});
