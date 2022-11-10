/**
 * Check if the color is a valid hex color
 */
export function isHexColor(color: string) {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Convert hex color to "r, g, b" string
 */
export function rgbFromHex(hex: string) {
  const h = hex.trim();
  const r = "0x" + h[1] + h[2];
  const g = "0x" + h[3] + h[4];
  const b = "0x" + h[5] + h[6];

  return `${Number(r)}, ${Number(g)}, ${Number(b)}`;
}
