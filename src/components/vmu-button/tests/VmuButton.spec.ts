import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { VmuButton } from "../components/VmuButton";

describe("VmuButton", () => {
  it("should render a filled button", async () => {
    const wrapper = mount(VmuButton, { props: { type: "filled" } });

    expect(wrapper.find("button").attributes("class")).toMatch("filled");
  });

  it("should render an outlined button", async () => {
    const wrapper = mount(VmuButton, { props: { type: "outlined" } });

    expect(wrapper.find("button").attributes("class")).toMatch("outlined");
  });

  it("should render a text button", async () => {
    const wrapper = mount(VmuButton, { props: { type: "text" } });

    expect(wrapper.find("button").attributes("class")).toMatch("text");
  });

  it("should render an elevated button", async () => {
    const wrapper = mount(VmuButton, { props: { type: "elevated" } });

    expect(wrapper.find("button").attributes("class")).toMatch("elevated");
  });

  it("should render a tonal button", async () => {
    const wrapper = mount(VmuButton, { props: { type: "tonal" } });

    expect(wrapper.find("button").attributes("class")).toMatch("tonal");
  });

  it("should render a disabled button", async () => {
    const wrapper = mount(VmuButton, { props: { disabled: true } });

    expect(wrapper.find("button").attributes("disabled")).toBeDefined();
  });

  it("should render a submit button", async () => {
    const wrapper = mount(VmuButton, { props: { submit: true } });

    expect(wrapper.find("button").attributes("type")).toEqual("submit");
  });

  it("should render a reset button", async () => {
    const wrapper = mount(VmuButton, { props: { reset: true } });

    expect(wrapper.find("button").attributes("type")).toEqual("reset");
  });
});
