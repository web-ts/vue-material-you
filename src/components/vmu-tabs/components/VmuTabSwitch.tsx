import injectDefined from "@/utilities/inject-defined";
import prop from "vue-typed-props";
import keys from "../keys";
import scss from "../scss/VmuTabSwitch.module.scss";
import { Tab } from "../types";
import { VmuIcon } from "@/components/vmu-icon";
import { VmuSheet } from "@/components/vmu-sheet";
import useRender from "@/composables/use-render";
export const VmuTabSwitch = defineComponent({
  name: "VmuTabSwitch",
  props: {
    tab: prop.object<Tab>(),
    index: prop.required.number(),
    hasIcons: prop.boolean(),
    parentHasFocus: prop.required.boolean()
  },
  setup(props) {
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);
    const switchTab = injectDefined(keys.SWITCH_TAB);

    const classList = computed(() => [
      scss.tabSwitch,
      props.hasIcons ? scss.tabSwitch_icons : "",
      props.index === currentTab.value && props.parentHasFocus ? scss.tabSwitch_focused : "",
      "vmu-ripple-primary vmu-text-title-small"
    ]);

    const sheetProps = computed(() => ({
      id: `${tabs.value[props.index]}_switch`,
      role: "tab",
      "aria-controls": tabs.value[props.index],
      "aria-selected": props.index === currentTab.value,
      "data-index": props.index,
      onClick: () => switchTab(props.index)
    }));

    useRender(() => (
      <VmuSheet tag="div" class={classList.value} {...sheetProps.value}>
        {props.hasIcons && props.tab?.icon && <VmuIcon icon={props.tab?.icon} class="vmu-inert" />}
        {props.tab?.label ?? props.index + 1}
      </VmuSheet>
    ));

    return {};
  }
});
