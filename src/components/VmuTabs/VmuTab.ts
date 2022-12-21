import useArrayLink from "@/composables/use-array-link";
import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";

import keys from "./keys";

export default defineComponent({
  name: "VmuTab",
  props: {
    index: prop.generic<number>()
  },
  setup(props, { slots }) {
    const switches = injectDefined(keys.SWITCH_ARRAY);
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);

    const { id, index } = useArrayLink(tabs);

    const currentIndex = computed(() => (props.index !== undefined ? props.index : index.value));

    const show = computed(() => currentIndex.value === currentTab.value);

    return () =>
      show.value &&
      h(
        "div",
        {
          key: id.value,
          id: id.value,
          "aria-labelledby": switches.value[index.value],
          role: "tabpanel",
          "data-index": currentIndex.value
        },
        slots.default?.({ currentTab: currentTab.value, tabIndex: index.value })
      );
  }
});
