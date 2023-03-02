import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { VmuTab } from "../components/VmuTab";
import keys from "../keys";

describe("VmuTab", () => {
  it("should render the tab panel with the correct props", () => {
    const tabArray = ref(["tab-1"]);
    const currentTab = ref(0);

    const wrapper = mount(VmuTab, {
      props: {
        id: "tab-1",
        index: 0
      },
      global: {
        provide: {
          [keys.TAB_ARRAY.toString()]: tabArray,
          [keys.CURRENT_TAB.toString()]: currentTab
        }
      }
    });

    expect(wrapper.html()).toContain("tab-1");
  });
});
