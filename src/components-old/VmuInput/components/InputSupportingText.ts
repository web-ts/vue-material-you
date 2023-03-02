import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import scss from "../index.module.scss";
import { ERROR } from "../keys";
export default defineComponent({
  name: "InputSupportingText",
  props: {
    text: prop.generic<string>(),
    count: prop.generic<number>(0),
    max: prop.generic<number>()
  },
  setup(props) {
    const error = injectDefined(ERROR);

    return () =>
      h("div", { class: ["vmu-text-body-small", scss.supportingText, error.value ? scss.supportingText_error : ""] }, [
        h("div", {}, props.text),
        props.max && h("div", {}, `${props.count}/${props.max}`)
      ]);
  }
});
