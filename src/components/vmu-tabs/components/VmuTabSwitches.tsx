import injectDefined from "@/utilities/inject-defined";
import prop from "vue-typed-props";
import keys from "../keys";
import scss from "../scss/VmuTabSwitches.module.scss";
import { VmuTabSwitch } from "./VmuTabSwitch";
import { Tab } from "../types";
import useFocusBind from "@/composables/use-focus-bind";
import useRender from "@/composables/use-render";

export const VmuTabSwitches = defineComponent({
  name: "VmuTabSwitches",
  props: {
    switches: prop.array<Tab>([]),
    currentTab: prop.required.number()
  },
  setup(props) {
    const tabIds = injectDefined(keys.TAB_ARRAY);

    const hasIcons = computed(() => props.switches.some((sw) => sw.icon));

    const tabs = injectDefined(keys.TAB_ARRAY);
    const switchTab = injectDefined(keys.SWITCH_TAB);

    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          if (props.currentTab + 1 <= tabs.value.length - 1) {
            switchTab(props.currentTab + 1);
          } else {
            switchTab(0);
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (props.currentTab - 1 >= 0) {
            switchTab(props.currentTab - 1);
          } else {
            switchTab(tabs.value.length - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          switchTab(0);
          break;
        case "End":
          e.preventDefault();
          switchTab(tabs.value.length - 1);
          break;
      }
    }

    const { inFocus, events } = useFocusBind();

    useRender(() => (
      <div
        class={scss.tabList}
        style={`--vmu-tab-number: ${tabIds.value.length}; --vmu-current-tab: ${props.currentTab};`}
      >
        <div class={scss.container} role="tablist" tabindex={0} onKeydown={onKeydown} {...events}>
          {tabIds.value.map((tab, index) => (
            <VmuTabSwitch
              key={tab}
              index={index}
              hasIcons={hasIcons.value}
              parentHasFocus={inFocus.value}
              tab={props.switches[index]}
            />
          ))}
          <div class={[scss.underline, hasIcons.value ? scss.underline_icons : ""]} aria-hidden="true">
            <div />
          </div>
        </div>
      </div>
    ));

    return {};
  }
});
