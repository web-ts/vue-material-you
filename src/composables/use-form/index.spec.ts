/* eslint-disable vue/one-component-per-file */
import { DEREGISTER_INPUT, REGISTER_INPUT } from "@/keys";
import { describe, expect, it } from "vitest";
import injectDefined from "@/utilities/inject-defined";

import useForm from ".";
import { mount } from "@vue/test-utils";

const child = defineComponent({
  setup() {
    const registerInput = injectDefined(REGISTER_INPUT);
    const deregisterInput = injectDefined(DEREGISTER_INPUT);

    return {
      registerInput,
      deregisterInput
    };
  }
});

const component = defineComponent({
  components: { child },
  setup() {
    const form = useForm({id: "test-form"});
    const child = ref();

    return {
      form,
      child
    };
  },
  template: "<child ref='child' />"
});

describe("use-form", () => {
  // it("should register an input", () => {
  //   const { registerInput, state } = useForm();

  //   registerInput("test-input-name", "test-value");

  //   expect(state["test-input-name"]).toBe("test-value");
  // });

  it("should provide the registerInput method", () => {
    const wrapper = mount(component);

    expect(wrapper.vm.child.registerInput).toBeInstanceOf(Function);
  });

  it("should provide the deregisterInput method", () => {
    const wrapper = mount(component);

    expect(wrapper.vm.child.deregisterInput).toBeInstanceOf(Function);
  });
});
