import { describe, expect, it } from "vitest";

import { colorData, internalColor, updateColor, color } from "../utilities/color-update";

describe("color-update", () => {
  it("should update the color", () => {
    updateColor("#6750A4");

    expect(colorData.light).toMatchSnapshot();
    expect(colorData.dark).toMatchSnapshot();
    expect(internalColor.value).toEqual("#6750A4");
  });

  it("should throw an error for an invalid color", () => {
    try {
      updateColor("invalid");
    } catch (error: any) {
      expect(error.message).toEqual("Invalid HEX color. Please use a valid HEX (eg. #12F349) color.");
    }
  });

  it("should update the color via the computed variable", () => {
    color.value = "#6750A4";

    expect(internalColor.value).toEqual("#6750A4");
  });
});
