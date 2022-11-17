import { DefineComponent } from "vue";
import { VMConfiguration } from "./types";

const config: VMConfiguration = { mountedOn: "app" };

export function getConfiguration() {
  return config;
}

/**
 *
 * @param icon The icon component to use
 * @param key The key to use for the icon
 * @param defaults The default props for the icon
 */
export function setIconData(icon: DefineComponent<any, any, any, any>, key: string, defaults?: Record<string, any>) {
  if (!config.icon)
    config.icon = {
      component: icon,
      key,
      defaults
    };
}

export function setMountedOn(mountedOn: string) {
  mountedOn = mountedOn.replace("#", "");
  config.mountedOn = mountedOn;
}
