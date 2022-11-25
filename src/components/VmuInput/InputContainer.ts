import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { ERROR } from "./keys";

export default defineComponent({
  name: "InputContainer",
  props: {
    leadingIcon: prop.generic<string>(),
    trailingIcon: prop.generic<string>()
  },
  setup(props, { slots }) {
    const error = injectDefined(ERROR);
    const classList = computed(() => ({
      [scss.container]: true,
      [scss.container_leadingIcon]: !!props.leadingIcon,
      [scss.container_trailingIcon]: !!props.trailingIcon,
      [scss.container_error]: error.value
    }));

    return () => h("div", { class: classList.value }, slots.default?.());
  }
});
