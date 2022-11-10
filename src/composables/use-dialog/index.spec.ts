import { expect, describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import useDialog from ".";

const component = defineComponent({
  setup() {
    const model = ref(false);

    const { dialogs, isLast } = useDialog(
      computed(() => "test"),
      model
    );

    return {
      dialogs,
      isLast,
      model,
    };
  },
});

describe("use-dialog", () => {
  const wrapper = mount(component);

  it("should add it to the list", async () => {
    wrapper.vm.model = true;
    await nextTick();
    expect(wrapper.vm.dialogs).toEqual(["test"]);
  });

  it("should add be last", async () => {
    expect(wrapper.vm.isLast).toBeTruthy();
  });

  it("should remove it from the list", async () => {
    wrapper.vm.model = false;
    await nextTick();
    expect(wrapper.vm.dialogs).toEqual([]);
  });
});
