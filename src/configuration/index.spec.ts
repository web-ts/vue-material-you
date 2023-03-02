/* eslint-disable vue/one-component-per-file */
import { expect, describe, it } from "vitest";
import { config, setIconData } from ".";

describe("configuration", () => {
  it("should get default config", () => {
    expect(config).toEqual({});
  });

  it("should set an icon component", () => {
    const icon = defineComponent({});

    setIconData(icon, "icon");
    expect(config.icon).toEqual({
      component: icon,
      key: "icon",
      defaults: undefined
    });
  });

  it("should set an icon component with defaults", async () => {
    const icon = defineComponent({ name: "Test" });

    setIconData(icon, "icon", { size: 24 });

    expect(config.icon).toEqual({
      component: icon,
      key: "icon",
      defaults: { size: 24 }
    });
  });
});
