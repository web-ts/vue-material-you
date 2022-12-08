import injectDefined from "@/utilities/inject-defined";
import isEmpty from "@/utilities/is-empty";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { ERROR } from "./keys";

export default defineComponent({
  name: "InputLabel",
  props: {
    id: prop.generic<string>(),
    label: prop.generic<string>(),
    isFocused: prop.boolean(),
    model: prop.generic<string | number>(),
    leadingIcon: prop.generic<string>(),
  },
  setup(props) {

    const error = injectDefined(ERROR);

    const classList = computed(() => ({
      [scss.label]: true,
      [`${scss.label_populated} vmu-text-body-small`]: props.isFocused,
      [`${scss.label_notEmpty} vmu-text-body-small`]: !isEmpty(props.model),
      [scss.label_leadingIcon]: !!props.leadingIcon,
      [scss.label_error]: error.value
    }));

    return () => h("label", { class: classList.value, for: props.id }, props.label ?? "");
  }
});
