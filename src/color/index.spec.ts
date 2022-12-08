import { expect, describe, it, afterEach } from "vitest";
import color from ".";
import { isDark, onSchemeChange, setDarkMode, settings } from "./dark-mode";
import { isHexColor, rgbFromHex } from "./hex-utilities";

describe("color", () => {
  afterEach(() => {
    document.head.innerHTML = "";
  });

  it("should create the right color variables", () => {
    color("#6750A4");
    const style = document.head.querySelector("style") as HTMLStyleElement;

    expect(style.innerHTML).toMatchSnapshot();
  });

  it("should not create multiple elements", () => {
    color("#6750A4");
    color("#ffffff");
    const elements = document.head.querySelectorAll("style");

    expect(elements.length).toEqual(1);
  });

  it("should not throw an error for an invalid color", () => {
    try {
      color("invalid");
    } catch (error: any) {
      expect(error.message).toEqual("Invalid HEX color. Please use a valid HEX (eg. #12F349) color.");
    }
  });
});

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

describe("dark-mode", () => {
  it("should default to auto", () => {
    expect(settings.userMode).toEqual("auto");
  });

  it("should return the right dark mode state", () => {
    setDarkMode("dark");
    expect(isDark.value).toBeTruthy();
  });

  it("should return the right light mode state", () => {
    setDarkMode("light");
    expect(isDark.value).toBeFalsy();
  });

  it("should return the right system mode", () => {
    onSchemeChange({ matches: false } as MediaQueryListEvent);
    expect(settings.systemMode).toEqual("light");
    onSchemeChange({ matches: true } as MediaQueryListEvent);
    expect(settings.systemMode).toEqual("dark");
  });

  it("should return the right user mode", () => {
    setDarkMode("dark");
    expect(settings.userMode).toEqual("dark");
    setDarkMode("light");
    expect(settings.userMode).toEqual("light");
  });
});
