/* eslint-disable vue/one-component-per-file */
import { expect, describe, it } from "vitest";
import { mount } from "@vue/test-utils";
import useDialog from ".";
import install from "@/install";

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
      model
    };
  }
});

const config = {
  color: "#42b883",
  icon: {
    component: defineComponent({}),
    key: "icon",
    defaults: { width: "18", height: "18" }
  }
};

describe("use-dialog", () => {
  document.body.innerHTML = "<div id='app'></div>";
  const vmu = install(config);
  const wrapper = mount(component, { attachTo: "body", global: { plugins: [vmu] } });

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
