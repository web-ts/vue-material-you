import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import type { ButtonType } from "./types";

import useRipple from "@/composables/use-ripple";
import VmuIcon from "../VmuIcon";

export default /* @__PURE__ */ defineComponent({
  name: "VmButton",
  props: {
    type: prop<ButtonType>("filled"),
    icon: prop<string | null | undefined>(null),
    submit: prop<boolean | undefined>({ type: Boolean, default: undefined }),
    reset: prop<boolean | undefined>({ type: Boolean, default: undefined }),
    disabled: prop<boolean>({ type: Boolean, default: undefined })
  },
  setup(props, { slots }) {
    const classList = computed(() => [
      "vmu-text-label-large vmu-ripple",
      scss.button,
      props.icon ? scss["padding-icon"] : scss.padding,
      scss[props.type]
    ]);

    const { rippleStyleObject, events } = useRipple();
    const nativeType = computed(() => {
      if (props.submit) return "submit";
      if (props.reset) return "reset";

      return "button";
    });

    return () =>
      h(
        "button",
        {
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
