import emit from "@/utilities/emit";
import prop from "vue-typed-props";
import keys from "../keys";
import { VmuTabSwitches } from "./VmuTabSwitches";
import { Tab } from "../types";
import useRender from "@/composables/use-render";

export const VmuTabs = defineComponent({
  name: "VmuTabs",
  props: {
    modelValue: prop.number(0),
    switches: prop.array<Tab>([])
  },
  emits: {
    "update:modelValue": emit<number>()
  },
  setup(props, { slots, emit }) {
    const currentTab = computed({
      get: () => props.modelValue,
      set: (newVal) => emit("update:modelValue", newVal)
    });

    const tabs = ref<Array<string>>([]);

    function switchTab(index: number) {
      currentTab.value = index;
    }

    provide(keys.CURRENT_TAB, currentTab);
    provide(keys.TAB_ARRAY, tabs);

    provide(keys.SWITCH_TAB, switchTab);

    useRender(() => (
      <>
        <VmuTabSwitches switches={props.switches} currentTab={currentTab.value} />
        {slots.default?.({ currentTab: currentTab.value, switchTab })}
      </>
    ));

    return {
      currentTab,
      tabs,
      switchTab
    };
  }
});
