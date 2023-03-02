import { DarkModeOptions, DarkModeState } from "../types";

export const darkModeOptions: DarkModeOptions = reactive({
  userMode: "auto",
  systemMode: "dark"
});

/**
 * The state of the dark mode
 */
export const dark = computed(() => {
  if (darkModeOptions.userMode === "auto") return darkModeOptions.systemMode === "dark";

  return darkModeOptions.userMode === "dark";
});

export function setDark(mode: DarkModeState) {
  darkModeOptions.userMode = mode;
}
