import vueJsx from "@vitejs/plugin-vue-jsx";
import autoImport from "unplugin-auto-import/vite";
import sassDts from "vite-plugin-sass-dts";
import yaml from "@modyfi/vite-plugin-yaml";
import vitePluginRaw from "vite-plugin-raw";

export default [
  vueJsx(),
  vitePluginRaw({
    match: /\.svg$/
  }),
  yaml(),
  sassDts(),
  autoImport({
    imports: ["vue"],
    dts: "src/auto-imports.d.ts"
  })
];
