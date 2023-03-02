import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { VmuApp } from "../components/VmuApp";

describe("VmuApp Rendering", () => {
  it("should render empty div", async () => {
    const wrapper = mount(VmuApp);

    expect(wrapper.find("div")).toBeDefined();
  });
});

describe("VmuApp State", () => {
  it("should be inert if it has scrims", async () => {
    const wrapper = mount(VmuApp);

    wrapper.vm.scrimUIDs.push("scrim-uid");

    await nextTick();

    expect(wrapper.html()).toMatch("inert");
  });
});

describe("VmuApp Accessibility", () => {
  it("should be hidden if it has scrims", async () => {
    const wrapper = mount(VmuApp);

    wrapper.vm.scrimUIDs.push("scrim-uid");

    await nextTick();

    expect(wrapper.html()).toMatch("aria-hidden");
  });
});

describe("VmuApp Color", () => {
  it("should create a color element", async () => {
    mount(VmuApp, { attachTo: document.body });

    await nextTick();

    expect(document.head.innerHTML).toMatch("vmu-colors");
  });
});
