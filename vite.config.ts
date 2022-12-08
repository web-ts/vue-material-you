import { getConfig } from "./configs";
import { resolve } from "path";
import { defineConfig } from "vite";

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
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@docs": resolve(__dirname, "./docs")
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
  ...getConfig(process.env.ENV)
});
