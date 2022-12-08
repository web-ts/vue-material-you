import { expect, describe, it } from "vitest";
import { getConfiguration, setIconData, setMountedOn } from ".";

describe("configuration", () => {
  it("should get default config", () => {
    expect(getConfiguration()).toEqual({ mountedOn: null });
  });

  it("should set mountedOn", () => {
    const container = document.createElement("div");

    setMountedOn(container);
    expect(getConfiguration()).toEqual({ mountedOn: container });
  });

  it("should set an icon component", () => {
    const icon = defineComponent({});

    setIconData(icon, "icon");
    expect(getConfiguration().icon).toEqual({
      component: icon,
      key: "icon",
      defaults: undefined
    });
  });
});
