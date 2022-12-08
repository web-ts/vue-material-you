import esLint from "vite-plugin-eslint";
import autoImport from "unplugin-auto-import/vite";
import sassDts from "vite-plugin-sass-dts";
import yaml from "@modyfi/vite-plugin-yaml";
import vitePluginRaw from "vite-plugin-raw";

export default [
  vitePluginRaw({
    match: /\.svg$/
  }),
  yaml(),
  esLint(),
  sassDts(),
  autoImport({
    imports: ["vue"],
    dts: "src/auto-imports.d.ts"
  })
];
