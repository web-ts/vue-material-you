import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import VmuCard from ".";

describe("vmu-card", () => {
  it("should render elevated card", () => {
    const wrapper = mount(VmuCard, { props: {} });

    expect(wrapper.html()).toContain("elevated");
  });

  it("should render filled card", () => {
    const wrapper = mount(VmuCard, { props: { type: "filled" } });

    expect(wrapper.html()).toContain("filled");
  });

  it("should render outlined card", () => {
    const wrapper = mount(VmuCard, { props: { type: "outlined" } });

    expect(wrapper.html()).toContain("outlined");
  });
});
