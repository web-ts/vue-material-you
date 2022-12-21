import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import keys from "./keys";
import scss from "./index.module.scss";
import TabSwitch from "./TabSwitch";
import { Tab } from "./types";

export default defineComponent({
  name: "TabSwitches",
  props: {
    tabs: prop.generic<Array<Tab>>([]),
    currentTab: prop.required<number>()
  },
  setup(props) {
    const tabIds = injectDefined(keys.TAB_ARRAY);

    const hasIcons = computed(() => props.tabs.some((tab) => tab.icon));

    const underlinePosition = reactive({
      left: 0,
      width: 0
    });

    const showTransition = ref(false);

    function processPosition() {
      const button = document.getElementById(`${tabIds.value[props.currentTab]}_switch`);

      if (!button) return { left: 0, width: 0 };
      const buttonRect = button.getBoundingClientRect();
      const containerRect = button.parentElement?.getBoundingClientRect();

      const left = buttonRect.left - (containerRect?.left || 0);
      const width = buttonRect.width;

      underlinePosition.left = left;
      underlinePosition.width = width;
    }

    const tabList = ref<HTMLElement | null>(null);
    const resizeObserver = new ResizeObserver(() => {
      processPosition();
    });

    watch(
      () => props.currentTab,
      () => {
        showTransition.value = true;
        processPosition();
      }
    );

    onMounted(() => {
      showTransition.value = false;
      processPosition();
      if (tabList.value) resizeObserver.observe(tabList.value);
    });

    onBeforeUnmount(() => {
      resizeObserver.disconnect();
    });

    function onScroll() {
      showTransition.value = false;
      processPosition();
    }

    const container = ref<HTMLElement | null>(null);

    function onMouseWheel(e: WheelEvent) {
      if (!container.value) return;
      e.preventDefault();
      container.value.scrollLeft += e.deltaY;
    }

    return () =>
      h(
        "div",
        {
          ref: tabList,
          class: scss.tabList,
          style: `--vmu-tab-number: ${tabIds.value.length}`
        },
        [
          h(
            "div",
            { ref: container, class: scss.container, role: "tablist", onScroll, onWheel: onMouseWheel },
            tabIds.value.map((_tab, index) =>
              h(TabSwitch, {
                key: index,
                index: index,
                hasIcons: hasIcons.value,
                tab: props.tabs[index]
              })
            )
          ),
          h(
            "div",
            {
              class: [scss.underline, hasIcons.value ? scss.underline_icons : ""],
              "aria-hidden": true,
              style: `--vmu-width: ${underlinePosition.width}px; --vmu-left: ${underlinePosition.left}px; ${
                showTransition.value ? "transition: transform 0.2s ease-in-out;" : ""
              }}`
            },
            h("div")
          )
        ]
      );
  }
});
