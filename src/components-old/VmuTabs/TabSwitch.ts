import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import keys from "./keys";
import scss from "./index.module.scss";
import { Tab } from "./types";
import VmuIcon from "../VmuIcon";
import Sheet from "../Sheet";
export default defineComponent({
  name: "TabSwitch",
  props: {
    tab: prop.generic<Tab>(),
    index: prop.required<number>(),
    hasIcons: prop.generic<boolean>()
  },
  setup(props) {
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);
    const switchTab = injectDefined(keys.SWITCH_TAB);

    /**
     * Switch the tab and also focus on the active button
     */
    function switchAndFocus(value: number) {
      switchTab(value);
      // Focus on the next tab
      document.getElementById(`${tabs.value[value]}_switch`)?.focus();
    }

    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
          if (currentTab.value + 1 <= tabs.value.length - 1) {
            switchAndFocus(currentTab.value + 1);
          } else {
            switchAndFocus(0);
          }
          break;
        case "ArrowLeft":
          if (currentTab.value - 1 >= 0) {
            switchAndFocus(currentTab.value - 1);
          } else {
            switchAndFocus(tabs.value.length - 1);
          }
          break;
        case "Home":
          switchAndFocus(0);
          break;
        case "End":
          switchAndFocus(tabs.value.length - 1);
          break;
      }
    }

    return () =>
      h(
        Sheet,
        {
          component: "button",
          class: [
            scss.tabSwitch,
            props.hasIcons ? scss.tabSwitch_icons : "",
            "vmu-ripple-primary vmu-text-title-small"
          ],
          id: `${tabs.value[props.index]}_switch`,
          type: "button",
          role: "tab",
          tabindex: props.index !== currentTab.value ? -1 : undefined,
          "aria-controls": tabs.value[props.index],
          "aria-selected": props.index === currentTab.value,
          "data-index": props.index,
          onKeydown,
          onClick: () => switchTab(props.index)
        },
        [
          props.hasIcons && props.tab?.icon && h(VmuIcon, { icon: props.tab?.icon }),
          props.tab?.label ?? props.index + 1
        ]
      );
  }
});
