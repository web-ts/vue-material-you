import { DefineComponent } from "vue";
import { VMUOptions } from "./types";

export const config: VMUOptions = {};

/**
 *
 * @param icon The icon component to use
 * @param key The key to use for the icon
 * @param defaults The default props for the icon
 */
export function setIconData(icon: DefineComponent<any, any, any, any>, key: string, defaults?: Record<string, any>) {
  if (!icon) throw new Error("Icon component is required");

  config.icon = {
    component: icon,
    key,
    defaults
  };
}
