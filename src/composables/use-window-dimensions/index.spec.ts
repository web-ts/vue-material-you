import { expect, describe, it } from "vitest";
import useWindowDimensions from ".";

describe("use-window-dimensions", () => {
  window.innerWidth = 100;
  window.innerHeight = 100;

  window.dispatchEvent(new Event("resize"));

  it("should match current window size", () => {
    const { width, height } = useWindowDimensions();

    expect(width.value).toBe(100);
    expect(height.value).toBe(100);
  });

  it("should update on window resize", () => {
    const { width, height } = useWindowDimensions();

    window.innerWidth = 300;
    window.innerHeight = 200;

    window.dispatchEvent(new Event("resize"));

    expect(width.value).toBe(300);
    expect(height.value).toBe(200);
  });
});
