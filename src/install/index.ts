import devtools from "@/devtools";
import type { App } from "vue";
import { setIconData } from "../configuration";
import type { InstallOptions } from "./types";
import { updateColor } from "@/color";
/**
 * Creates a new instance of Vue Material You.
 * This does NOT install any components. Please register each component individually.
 */
export default function (options: InstallOptions) {
  /**
   * Initialize Vue Material.
   * @param app The Vue app
   * @param options The options that were passed to the install function
   */
  function install(app: App) {
    updateColor(options.color);

    if (options.icon) {
      const { component, key, defaults } = options.icon;

      setIconData(component, key, defaults);
    }

    if (process.env.NODE_ENV === "development" || __VUE_PROD_DEVTOOLS__) {
      devtools(app);
    }
  }

  return install;
}
