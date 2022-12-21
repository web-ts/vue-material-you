import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import keys from "./keys";
import TabSwitches from "./TabSwitches";
import { Tab } from "./types";

export default defineComponent({
  name: "VmuTabs",
  props: {
    modelValue: prop.generic<number>(0),
    tabs: prop.generic<Array<Tab>>([])
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
    const switches = ref<Array<string>>([]);

    function switchTab(index: number) {
      currentTab.value = index;
    }

    provide(keys.CURRENT_TAB, currentTab);
    provide(keys.TAB_ARRAY, tabs);
    provide(keys.SWITCH_ARRAY, switches);
    provide(keys.SWITCH_TAB, switchTab);

    return () => [
      h(TabSwitches, { tabs: props.tabs, currentTab: currentTab.value }),
      slots.default?.({ currentTab: currentTab.value, switchTab })
    ];
  }
});
