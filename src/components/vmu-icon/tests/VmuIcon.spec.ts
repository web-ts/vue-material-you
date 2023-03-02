import { createVueMaterialYou } from "@/index";
import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";

import { VmuIcon } from "../components/VmuIcon";

describe("VmuIcon", () => {
  document.body.innerHTML = "<div id='app'></div>";
  // We need to load the plugin before we can test the icon component
  const createVMU = createVueMaterialYou({
    color: "#ffffff",
    icon: {
      component: defineComponent({
        props: { theKey: { type: String }, theOverride: { type: String } },
        setup: (props) => () => (props.theOverride ? props.theOverride : props.theKey)
      }),
      key: "theKey"
    }
  });

  createVMU({} as any);

  it("should correctly render the custom component with the given key", async () => {
    const wrapper = mount(VmuIcon, { props: { icon: "test" } });

    expect(wrapper.html()).toMatch("test");
  });

  it("should correctly render the custom component with overridden props", async () => {
    const wrapper = mount(VmuIcon, { props: { icon: "test", props: { theOverride: "This should be rendered" } } });

    expect(wrapper.html()).toMatch("This should be rendered");
  });
});
