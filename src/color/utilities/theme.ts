import { argbFromHex, hexFromArgb, themeFromSourceColor } from "../material-color";
import { rgbFromHex } from "./hex";

export function createTheme(color: string, dark: boolean) {
  // Create a theme.
  const theme = themeFromSourceColor(argbFromHex(color), [
    {
      name: "success",
      value: 4278229316,
      blend: false
    },
    {
      name: "info",
      value: 4284727519,
      blend: false
    },
    {
      name: "warning",
      value: 4292389403,
      blend: false
    }
  ]);

  const scheme = dark ? theme.schemes.dark : theme.schemes.light;

  const properties = new Map<string, string>();

  for (const [key, value] of Object.entries(scheme.toJSON())) {
    const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    const color = rgbFromHex(hexFromArgb(value));

    properties.set(`--vmu-color-${token}`, color);
  }

  theme.customColors.forEach((customColor) => {
    const group = dark ? customColor.dark : customColor.light;

    for (const [key, value] of Object.entries(group)) {
      const token = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase()
        .replace("color", customColor.color.name);
      const color = rgbFromHex(hexFromArgb(value));

      properties.set(`--vmu-color-${token}`, color);
    }
  });

  properties.set("--vmu-color-disabled", dark ? "227, 227, 227" : "31, 31, 31");

  return Array.from(properties)
    .map(([key, val]) => `${key}:${val};`)
    .join("\n");
}
