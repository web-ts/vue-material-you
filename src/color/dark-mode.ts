import { DarkModeSettings, DarkModeState } from "./types";

/**
 * The default dark mode settings.
 */
export const settings: DarkModeSettings = reactive({
  userMode: "auto",
  systemMode: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
});

export function onSchemeChange(event: MediaQueryListEvent) {
  const isDark = event.matches;

  settings.systemMode = isDark ? "dark" : "light";
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSchemeChange);

export const isDark = computed(() => {
  if (settings.userMode === "auto") return settings.systemMode === "dark";

  return settings.userMode === "dark";
});

export function setDarkMode(mode: DarkModeState) {
  settings.userMode = mode;
}

export const darkMode = computed({
  get: () => settings.userMode,
  set: (mode) => setDarkMode(mode)
});
