import { dialogs } from "@/composables/use-dialog";
import devtools from "@/devtools";
import type { App } from "vue";
import color from "../color";
import { setIconData, setMountedOn } from "../configuration";
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
  function install(app: App) {
    color(options.color);

    const interval = setInterval(() => {
      if (app._container) {
        clearInterval(interval);
        setMountedOn(app._container);
      }
    }, 1);

    // Add a watcher for the dialogs array
    watch(dialogs, (newValue) => {
      if (!app._container || newValue.length > 0) return;
      app._container.inert = false;
      app._container.ariaHidden = "false";
    });

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
