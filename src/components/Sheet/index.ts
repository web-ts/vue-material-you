import useRipple from "@/composables/use-ripple";
import prop from "@/utilities/prop";
import { DefineComponent } from "vue";

import scss from "./index.module.scss";

export default defineComponent({
  name: "Sheet",
  props: {
    component: prop.generic<string | DefineComponent<any, any, any, any, any, any, any, any, any, any>>("div"),
    disableRipple: prop.boolean(false)
  },
  setup(props, { slots }) {
    const { rippleStyleObject, events } = useRipple();

    return () =>
      (props.disableRipple
        ? h(props.component, {}, slots.default?.())
        : h(props.component, { class: scss.sheet, style: rippleStyleObject.value, ...events }, slots.default?.()));
  }
});
