import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import customColors from "./custom-colors.yaml";
import messages from "./messages.yaml";
import { isDark } from "./dark-mode";
import { isHexColor, rgbFromHex } from "./hex-utilities";

const currentColor = ref("#000000");

/**
 * Apply the theme to the document
 * @param dark Whether or not the theme should be dark
 */
function apply(dark: boolean) {
  const target = document.getElementById("vmu-colors") as HTMLStyleElement;

  if (!target) throw new Error(messages.NO_TARGET_ELEMENT);

  // Create a theme.
  const theme = themeFromSourceColor(argbFromHex(currentColor.value));
  // Create a dummy element to apply the theme to. This is done due to the limitations of 'applyTheme'.
  const dummy = document.createElement("div");

  // Apply the theme to the dummy element.
  applyTheme(theme, { target: dummy, dark });

  // Get the computed styles of the dummy element and transform all the values to 'r, g, b' strings.
  const data = dummy.style.cssText
    .split(";")
    .map((colorSet) => {
      const [key, value] = colorSet.split(":");

      return value ? { key, value: rgbFromHex(value) } : { key: null, value: null };
    })
    .map(({ key, value }) => (value ? `${key.replace("md-sys", "vmu")}: ${value}` : ""))
    .join(";\n");

  /**
   * Custom Colors
   */
  const cc = Object.entries(customColors[dark ? "dark" : "light"])
    .map(([key, value]) => `${key}: ${value}`)
    .join(";\n");

  target.innerHTML = `* {\n${data}\n${cc}}`;
}

export function changeColor(color: string) {
  if (!isHexColor(color)) throw new Error(messages.INVALID_HEX);
  currentColor.value = color;
  apply(isDark.value);
}

export function getColor() {
  return currentColor.value;
}

export const color = computed({
  get: () => currentColor.value,
  set: (color) => changeColor(color)
});

/**
 * Initialize the color module and apply the theme to the body of the document
 * @param color The color that our pallette will be based on
 */
export default function (color: string): void {
  if (!isHexColor(color)) throw new Error(messages.INVALID_HEX);
  currentColor.value = color;
  const target = document.getElementById("vmu-colors") as HTMLStyleElement | null;

  if (!target) {
    const style = document.createElement("style");

    style.id = "vmu-colors";
    document.head.appendChild(style);
  }

  apply(isDark.value);

  watch(isDark, () => {
    apply(isDark.value);
  });
}
