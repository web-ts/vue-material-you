import useArrayBind from "@/composables/use-array-bind";
import useId from "@/composables/use-id";
import useRender from "@/composables/use-render";
import injectDefined from "@/utilities/inject-defined";
import prop from "vue-typed-props";

import keys from "../keys";

export const VmuTab = defineComponent({
  name: "VmuTab",
  props: {
    id: prop.string(),
    index: prop.number()
  },
  setup(props, { slots }) {
    const tabs = injectDefined(keys.TAB_ARRAY);
    const currentTab = injectDefined(keys.CURRENT_TAB);

    const id = useId(props);
    const { index, bind } = useArrayBind(id, tabs);

    bind();

    const currentIndex = computed(() => (props.index !== undefined ? props.index : index.value));

    const show = computed(() => currentIndex.value === currentTab.value);

    useRender(
      () =>
        show.value && (
          <div
            role="tabpanel"
            key={id.value}
            id={id.value}
            aria-labelledby={`${tabs.value[index.value]}_switch`}
            data-index={currentIndex.value}
          >
            {slots.default?.({ currentTab: currentTab.value, index: index.value })}
          </div>
        )
    );

    return {
      tabId: id
    };
  }
});
