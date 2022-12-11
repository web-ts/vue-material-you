import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import type { ButtonType } from "./types";

import useRipple from "@/composables/use-ripple";
import VmuIcon from "../VmuIcon";

export default /* @__PURE__ */ defineComponent({
  name: "VmButton",
  props: {
    type: prop.generic<ButtonType>("filled"),
    icon: prop.generic<string | null>(null),
    submit: prop.boolean(),
    reset: prop.boolean(true),
    disabled: prop.boolean(),
    href: prop.generic<string>(),
    size: prop.generic<"large" | "medium" | "small">("large")
  },
  setup(props, { slots }) {
    const classList = computed(() => [
      "vmu-ripple",
      scss.button,
      props.icon ? scss[`button_${props.size}_icon`] : scss[`button_${props.size}`],
      scss[props.type],
      `vmu-text-label-${props.size}`
    ]);

    const { rippleStyleObject, events } = useRipple();
    const nativeType = computed(() => {
      if (props.submit) return "submit";
      if (props.reset) return "reset";

      return "button";
    });

    return () =>
      h(
        props.href ? "a" : "button",
        {
          href: props.href,
          type: nativeType.value,
          disabled: props.disabled,
          class: classList.value,
          style: rippleStyleObject.value,
          ...events
        },
        props.icon ? [h(VmuIcon, { icon: props.icon }), slots.default?.()] : slots.default?.()
      );
  }
});
