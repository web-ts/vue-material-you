import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import sharedPlugins from "./shared-plugins";
import WindiCSS from "vite-plugin-windicss";
export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false,
    PLAYGROUND: true
  },
  plugins: [...sharedPlugins, WindiCSS(), vue()]
});
