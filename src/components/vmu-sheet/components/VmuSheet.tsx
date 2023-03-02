import prop from "vue-typed-props";

import useRipple from "@/composables/use-ripple";
import useRender from "@/composables/use-render";

import scss from "../scss/VmuSheet.module.scss";

export const VmuSheet = /* @__PURE__ */ defineComponent({
  name: "Sheet",
  props: {
    tag: prop.string("div"),
    disableRipple: prop.boolean(false)
  },
  setup(props, { slots }) {
    const { rippleStyleObject, events } = useRipple();

    const sheetProps = computed(() =>
      (props.disableRipple ? {} : { class: scss.sheet, style: rippleStyleObject.value, ...events })
    );

    useRender(() => <props.tag {...sheetProps.value}>{slots.default?.()}</props.tag>);

    return { rippleStyleObject };
  }
});
