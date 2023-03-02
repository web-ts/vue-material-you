/**
 * Create the style element to be used with the color module
 */
export function createColorElement(): void {
  const target = document.getElementById("vmu-colors") as HTMLStyleElement | null;

  if (!target) {
    const style = document.createElement("style");

    style.id = "vmu-colors";
    document.head.appendChild(style);
  }
}

export function updateColorElementData(data: string) {
  const target = document.getElementById("vmu-colors") as HTMLStyleElement | null;

  if (!target) throw new Error("Could not find color style element.");

  target.innerHTML = `* {
${data}
}`;
}
