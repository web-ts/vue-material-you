import type { App } from "vue";
import color from "../color";
import { setIconData } from "../configuration";
import type { InstallOptions } from "./types";

/**
 * Creates a new instance of Vue Material You.
 * This does NOT install any components. Please register each component individually.
 */
export default function (options: InstallOptions) {
  /**
   * Initialize Vue Material.
   * @param _app The Vue app
   * @param options The options that were passed to the install function
   */
  function install(_app: App) {
    color(options.color);
    if (options.icon) {
      const { component, key, defaults } = options.icon;

      setIconData(component, key, defaults);
    }
  }

  return install;
}
