import { describe, expect, it } from "vitest";

import { createColorElement, updateColorElementData } from "../utilities/element";

describe("element", () => {
  it("should create the color element", () => {
    createColorElement();

    const element = document.getElementById("vmu-colors");

    expect(element).toBeTruthy();
  });

  it("should update the color element", () => {
    createColorElement();
    updateColorElementData("color: red;");

    const element = document.getElementById("vmu-colors");

    expect(element?.innerHTML).toEqual("* {\ncolor: red;\n}");
  });
});
