import { expect, describe, it, vi } from "vitest";

import useRipple from ".";

describe("use-ripple", () => {
  const touchEvent = {
    target: {
      getBoundingClientRect() {
        return { left: 0, top: 0, width: 100, height: 50 };
      }
    },
    touches: [
      {
        clientX: 100,
        clientY: 100
      }
    ]
  };

  it("should match default values", () => {
    const { rippleStyleObject } = useRipple();

    expect(rippleStyleObject.value).toMatchSnapshot();
  });

  it("should expand on click and match the client events", async () => {
    const { rippleStyleObject, events } = useRipple();

    events.onTouchdown(touchEvent as any);

    expect(rippleStyleObject.value).toMatchSnapshot();
  });

  it("should revet to default button size", async () => {
    vi.spyOn(global, "setTimeout").mockImplementation((fn) => fn() as any);
    const { rippleStyleObject, events } = useRipple();

    events.onTouchdown(touchEvent as any);

    events.onTouchup(touchEvent as any);

    expect(rippleStyleObject.value).toMatchSnapshot();
  });
});
