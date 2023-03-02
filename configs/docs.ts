import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import sharedPlugins from "./shared-plugins";
import Markdown from "vite-plugin-md";
import prism from "markdown-it-prism";
import anchor from "markdown-it-anchor";
import classPlugin from "@toycode/markdown-it-class";

export default defineConfig({
  define: {
    VERSION: JSON.stringify(process.env.npm_package_version),
    __VUE_PROD_DEVTOOLS__: false,
  },
  plugins: [
    ...sharedPlugins,
    WindiCSS(),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typography: true
      },
      markdownItSetup(md) {
        md.use(classPlugin, {
          h1: "vmu-text-headline-large mb-8 border-b border-secondary border-opacity-50",
          h2: "vmu-text-headline-medium mb-4",
          p: "my-4 vmu-text-body-large",
          a: "vmu-text-primary",
          table: "markdown-table"
        });
        md.use(prism);
        md.use(anchor);
      }
    })
  ]
});
