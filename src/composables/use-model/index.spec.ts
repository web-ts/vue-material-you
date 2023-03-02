import prop from "vue-typed-props";
import emit from "@/utilities/emit";
import { expect, describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import useModel from ".";

const component = defineComponent({
  props: {
    modelValue: prop.required.string()
  },
  emits: { "update:modelValue": emit<string>() },
  setup(props, { emit }) {
    const model = useModel(props, emit);

    model.value = "test";

    return {
      model
    };
  },
  template: "<div></div>"
});

describe("use-model", () => {
  it("should emit an update event", () => {
    const wrapper = mount(component, { props: { modelValue: "test" } });

    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
  });
});
