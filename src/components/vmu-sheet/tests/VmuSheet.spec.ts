import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { VmuSheet } from "../components/VmuSheet";

describe("VmuSheet Rendering", () => {
  it("should render ripple elements", async () => {
    const wrapper = mount(VmuSheet);

    expect(wrapper.html()).toMatch("--ripple");
  });

  it("should not render ripple elements", async () => {
    const wrapper = mount(VmuSheet, { props: { disableRipple: true } });

    expect(wrapper.html()).toMatch("<div></div>");
  });

  it("should render custom tag", async () => {
    const wrapper = mount(VmuSheet, { props: { tag: "span" } });

    expect(wrapper.html()).toMatch("<span");
  });
});

describe("VmuSheet Events", () => {
  it("should emit 'click' on click", async () => {
    const wrapper = mount(VmuSheet);

    await wrapper.find("div").trigger("click");

    expect(wrapper.emitted("click")).toBeTruthy();
  });
});
