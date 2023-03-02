import { expect, describe, it, vi } from "vitest";

import useRipple from ".";

describe("use-ripple", () => {
  const event = {
    target: {
      getBoundingClientRect() {
        return { left: 0, top: 0, width: 100, height: 50 };
      }
    },
    clientX: 100,
    clientY: 100
  };

  it("should match default values", () => {
    const { rippleStyleObject } = useRipple();

    expect(rippleStyleObject.value).toEqual({
      "--ripple-height": "0px",
      "--ripple-pos-x": "0px",
      "--ripple-pos-y": "0px",
      "--ripple-width": "0px",
      "--ripple-scale": "0",
      "--ripple-opacity": "0",
      "--transition-property": "transform"
    });
  });

  it("should expand on click and match the client events", async () => {
    const { rippleStyleObject, events } = useRipple();

    events.onPointerdown(event as any);
    expect(rippleStyleObject.value).toEqual({
      "--ripple-height": "50px",
      "--ripple-pos-x": "100px",
      "--ripple-pos-y": "100px",
      "--ripple-width": "50px",
      "--ripple-scale": "6",
      "--ripple-opacity": "0.2",
      "--transition-property": "transform"
    });
  });

  it("should revet to default button size", async () => {
    vi.spyOn(global, "setTimeout").mockImplementation((fn) => fn() as any);
    const { rippleStyleObject, events } = useRipple();

    events.onPointerdown(event as any);
    events.onPointerup();

    const expected = {
      "--ripple-height": "0px",
      "--ripple-pos-x": "0px",
      "--ripple-pos-y": "0px",
      "--ripple-width": "0px"
    };

    expect(rippleStyleObject.value["--ripple-height"]).toBe(expected["--ripple-height"]);
    expect(rippleStyleObject.value["--ripple-pos-x"]).toBe(expected["--ripple-pos-x"]);
    expect(rippleStyleObject.value["--ripple-pos-y"]).toBe(expected["--ripple-pos-y"]);
    expect(rippleStyleObject.value["--ripple-width"]).toBe(expected["--ripple-width"]);
  });
});
