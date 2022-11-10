import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import type { ButtonType } from "./types";

import useRipple from "@/composables/use-ripple";
import VmuIcon from "../VmuIcon";


export default defineComponent({
  name: "VmButton",
  props: {
    type: prop<ButtonType>("filled"),
    icon: prop<string | null | undefined>(null)
  },
  setup(props, { slots }) {
    const classList = computed(() => [
      "md-text-label-large md-ripple",
      scss.button,
      props.icon ? scss["padding-icon"] : scss.padding,
      scss[props.type]
    ]);

    const { rippleStyleObject, events } = useRipple();

    return () =>
      h(
        "button",
        { class: classList.value, style: rippleStyleObject.value, ...events },
        props.icon ? [h(VmuIcon, { icon: props.icon }), slots.default?.()] : slots.default?.()
      );
  }
});
