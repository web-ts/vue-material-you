import { describe, expect, it } from "vitest";

import { createTheme } from "../utilities/theme";

describe("theme", () => {
  it("should successfully create a theme when passed a good color", () => {
    // Light theme
    expect(createTheme("#6750A4", false)).toMatchSnapshot();
    // Dark theme
    expect(createTheme("#6750A4", true)).toMatchSnapshot();
  });
});
