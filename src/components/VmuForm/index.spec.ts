import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import VmuForm from ".";

describe("vmu-form", () => {
  it("should have an id", () => {
    const wrapper = mount(VmuForm, { props: { id: "test-form" } });

    expect(wrapper.attributes()).toEqual({ id: "test-form" });
  });

  it("should have a random id", () => {
    const wrapper = mount(VmuForm);

    const attrs = wrapper.attributes()

    expect(attrs.id).toBeDefined();
  });
});
