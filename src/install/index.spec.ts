import { describe, expect, it } from "vitest";

import install from ".";

const config = {
  color: "#42b883",
  icon: {
    component: defineComponent({}),
    key: "icon",
    defaults: { width: "18", height: "18" }
  }
};

describe("install", () => {
  it("should return an install the plugin", () => {
    expect(install(config)).toBeInstanceOf(Function);
  });

  it("should install on a vue instance", () => {
    const app = createApp({});
    const vmuPlugin = install(config);

    app.use(vmuPlugin);

    // Plugin is installed if we have the colors element
    expect(document.getElementById("vmu-colors")).toBeDefined();
  });
});
