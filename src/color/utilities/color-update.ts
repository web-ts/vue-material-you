import { isHexColor } from "./hex";

import { createTheme } from "./theme";

export const colorData = reactive({
  light: "",
  dark: ""
});

export const internalColor = ref("");

export function updateColor(color: string) {
  if (!isHexColor(color)) throw new Error("Invalid HEX color. Please use a valid HEX (eg. #12F349) color.");

  const light = createTheme(color, false);
  const dark = createTheme(color, true);

  colorData.light = light;
  colorData.dark = dark;

  internalColor.value = color;
}

export const color = computed({
  get: () => internalColor.value,
  set: (newVal) => updateColor(newVal)
});
