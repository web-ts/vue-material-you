import { colorData, createColorElement, updateColorElementData } from "@/color";
import { dark, darkModeOptions } from "@/color/utilities/dark";
import useRender from "@/composables/use-render";
import { SCRIM_UID_ARRAY } from "@/keys/scrim";

import scss from "../scss/VmuApp.module.scss";

export const VmuApp = /* @__PURE__ */ defineComponent({
  name: "VmuApp",
  setup(_, { slots }) {
    const scrimUIDs = ref<Array<string>>([]);

    provide(SCRIM_UID_ARRAY, scrimUIDs);

    const appProps = computed(() => {
      if (scrimUIDs.value.length > 0) return { inert: true, "aria-hidden": true };

      return {};
    });

    onMounted(() => {
      // Set the system mode upon mount
      darkModeOptions.systemMode = window?.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      // Set a window listener
      window?.matchMedia?.("(prefers-color-scheme: dark)").addEventListener("change", (event: MediaQueryListEvent) => {
        const isDark = event.matches;

        darkModeOptions.systemMode = isDark ? "dark" : "light";
      });

      // Create a color element
      createColorElement();

      updateColorElementData(dark.value ? colorData.dark : colorData.light);

      watch(dark, () => {
        updateColorElementData(dark.value ? colorData.dark : colorData.light);
      });
    });

    useRender(() => (
      <div class={scss.app} {...appProps.value}>
        {slots.default?.()}
      </div>
    ));

    return { scrimUIDs };
  }
});
