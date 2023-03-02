import { describe, expect, it } from "vitest";

import { darkModeOptions, dark, setDark } from "../utilities/dark";

describe("dark-mode", () => {
  it("should default to userMode auto and systemDark", () => {
    expect(darkModeOptions.userMode).toEqual("auto");

    expect(darkModeOptions.systemMode).toEqual("dark");
  });

  it("should return the right dark mode state", async () => {
    setDark("dark");

    await nextTick();

    expect(dark.value).toEqual(true);

    setDark("light");

    await nextTick();

    expect(dark.value).toEqual(false);
  });
});
