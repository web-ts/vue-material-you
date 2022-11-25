import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities";
import customColors from "./custom-colors.yaml";
import { isDark } from "./dark-mode";
import { isHexColor, rgbFromHex } from "./hex-utilities";

function apply(target: HTMLStyleElement, color: string, dark: boolean) {
  // Create a theme.
  const theme = themeFromSourceColor(argbFromHex(color));
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

/**
 * Initialize the color module and apply the theme to the body of the document
 * @param color The color that our pallette will be based on
 */
export default function (color: string): void {
  if (!isHexColor(color)) throw new Error("Invalid HEX color. Please use a valid HEX (eg. #12F349) color.");

  const style = document.getElementById("vmu-colors") as HTMLStyleElement ?? document.createElement("style");

  style.id = "vmu-colors";

  apply(style, color, isDark.value);
  document.head.appendChild(style);
  watch(isDark, () => {
    apply(style, color, isDark.value);
  });
}
