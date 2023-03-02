import { describe, expect, it } from "vitest";
import { isHexColor, rgbFromHex } from "../utilities/hex";

describe("hex-utilities", () => {
  it("should convert hex to rgb", () => {
    expect(rgbFromHex("#6750a4")).toEqual("103, 80, 164");
    expect(rgbFromHex("#6750A4")).toEqual("103, 80, 164");
    expect(rgbFromHex("#123456")).toEqual("18, 52, 86");
  });

  it("should check if the color is a valid hex color", () => {
    // Good values
    expect(isHexColor("#6750a4")).toBeTruthy();
    expect(isHexColor("#ffffff")).toBeTruthy();

    // Bad values
    expect(isHexColor("6750a4")).toBeFalsy();
    expect(isHexColor("#6750a4a")).toBeFalsy();
    expect(isHexColor("#6750a")).toBeFalsy();
    expect(isHexColor("asdasdasd")).toBeFalsy();
  });
});
