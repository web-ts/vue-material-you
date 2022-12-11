import { expect, describe, it } from "vitest";
import useInput from ".";
import prop from "@/utilities/prop";
import { InputRule } from "./types";
import { mount } from "@vue/test-utils";

/**
 * Define a component to test the useInput composable
 */
const input = defineComponent({
  props: {
    modelValue: prop.required<string>(),
    rules: prop.generic<Array<InputRule>>([])
  },
  emit: {
    "update:modelValue": (_value: string) => 0
  },
  setup(props, { emit }) {
    const { id, name, model, isValid, isClear, handleChange } = useInput(props, emit);

    return {
      id,
      name,
      model,
      isValid,
      isClear,
      handleChange
    };
  }
});

describe("useInput", () => {
  it("should fail outside a form", () => {
    try {
      const wrapper = mount(input);

      expect(wrapper.vm.id).toBeDefined();
    } catch (e) {
      expect((e as Error).message).toContain("is not defined");
    }
  });
});
