import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import sharedPlugins from "./shared-plugins";
import Markdown from "vite-plugin-md";
// import code from "@yankeeinlondon/code-builder";
import prism from "markdown-it-prism";
export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false
  },
  plugins: [
    ...sharedPlugins,
    WindiCSS(),
    vue({
      include: [/\.vue$/, /\.md$/] // <--
    }),
    Markdown({
      markdownItSetup(md) {
        md.use(prism);
      }
    })
  ]
});
