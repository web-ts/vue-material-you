import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import VmuIcon from "../VmuIcon";
import { ButtonType } from "./types";

import spinnerIcon from "@/icons/spinner.svg?raw";
import Sheet from "../Sheet";

export default /* @__PURE__ */ defineComponent({
  name: "VmButton",
  props: {
    disabled: prop.boolean(),
    href: prop.generic<string>(),
    icon: prop.generic<string | null>(null),
    loading: prop.boolean(),
    reset: prop.boolean(),
    size: prop.generic<"large" | "medium" | "small">("large"),
    submit: prop.boolean(),
    type: prop.generic<ButtonType>("filled")
  },
  setup(props, { slots }) {
    const colorMapping: Record<ButtonType, string> = {
      filled: "on-primary",
      outlined: "primary",
      text: "primary",
      elevated: "primary",
      tonal: "on-secondary-container"
    };
    const classList = computed(() => [
      props.icon ? scss[`button_${props.size}_icon`] : scss[`button_${props.size}`],
      scss.button,
      scss[`button_${props.type}`],
      `vmu-ripple-${colorMapping[props.type]} vmu-text-label-${props.size}`
    ]);

    const style = computed(() => ({ color: props.loading ? "transparent" : undefined }));

    /**
     * Native type of the button. If the button is a submit or reset button, the native type will be set to the respective type.
     */
    const nativeType = computed(() => {
      if (props.submit) return "submit";
      if (props.reset) return "reset";

      return "button";
    });

    return () =>
      h(
        Sheet,
        {
          component: props.href ? "a" : "button",
          href: props.href,
          type: nativeType.value,
          disabled: props.disabled || props.loading,
          class: classList.value,
          style: style.value
        },
        () => [
          props.icon ? [h(VmuIcon, { icon: props.icon }), slots.default?.()] : slots.default?.(),
          props.loading && h("span", { class: scss.button__loader, innerHTML: spinnerIcon, "aria-hidden": true })
        ]
      );
  }
});
