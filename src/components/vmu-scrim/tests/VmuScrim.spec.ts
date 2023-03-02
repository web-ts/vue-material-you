import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import { VmuScrim } from "../components/VmuScrim";
import { SCRIM_UID_ARRAY } from "@/keys/scrim";

const options = {
  slots: {
    default: "inside_slot"
  },
  global: {
    stubs: { teleport: true },
    provide: {
      [SCRIM_UID_ARRAY as unknown as symbol]: ref([]) // this is shared across all tests :D
    }
  }
};

describe("VmuScrim Rendering", () => {
  it("should be open by default", async () => {
    const wrapper = mount(VmuScrim, { props: { modelValue: true }, ...options });

    expect(wrapper.html()).toMatch("inside_slot");
  });

  it("should be closed by default", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: false },
      ...options
    });

    expect(!wrapper.html().includes("inside_slot")).toBeTruthy();
  });
});

describe("VmuScrim Events", () => {
  it("should emit 'update:modelValue' on click if closable", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id", closable: true },
      ...options
    });

    await wrapper.find("#scrim-id").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
  });

  it("should not emit 'update:modelValue' on click if not closable", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id" },
      ...options
    });

    await wrapper.find("#scrim-id").trigger("click");

    expect(wrapper.emitted("update:modelValue")).toBeFalsy();
  });
});

describe("VmuScrim State", () => {
  it("should generate an id if none is provided", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true },
      ...options
    });

    expect(wrapper.vm.scrimId).toMatch("uid-");
  });

  it("should register itself in the array", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "should-be-in-array" },
      ...options
    });

    expect(wrapper.vm.scrimUIDs.includes("should-be-in-array")).toBeTruthy();
  });

  it("should remove itself from the array on unmount", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "should-not-be-in-array" },
      ...options
    });

    wrapper.unmount();

    expect(wrapper.vm.scrimUIDs.includes("should-not-be-in-array")).toBeFalsy();
  });

  it("should remove itself from the array on close", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "should-remove-itself" },
      ...options
    });

    await wrapper.setProps({ modelValue: false });

    expect(wrapper.vm.scrimUIDs.includes("should-remove-itself")).toBeFalsy();
  });

  it("should be inert if not last", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id" },
      global: {
        stubs: { teleport: true },
        provide: {
          [SCRIM_UID_ARRAY as unknown as symbol]: ref(["scrim-id", "scrim-id-2"])
        }
      }
    });

    expect(wrapper.find("#scrim-id").attributes("inert")).toBeTruthy();
  });
});

describe("VmuScrim Accessibility", () => {
  it("should have a role of dialog", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id" },
      ...options
    });

    expect(wrapper.find("#scrim-id").attributes("role")).toMatch("dialog");
  });

  it("should have an aria-modal of true", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id" },
      ...options
    });

    expect(wrapper.find("#scrim-id").attributes("aria-modal")).toMatch("true");
  });

  it("should have a describedby and labelledby", async () => {
    const wrapper = mount(VmuScrim, {
      props: { modelValue: true, id: "scrim-id" },
      ...options
    });

    expect(wrapper.find("#scrim-id").attributes("aria-describedby")).toBe("scrim-id-description");
    expect(wrapper.find("#scrim-id").attributes("aria-labelledby")).toBe("scrim-id-title");
  });
});
