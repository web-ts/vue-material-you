import injectDefined from "@/utilities/inject-defined";
import prop from "@/utilities/prop";
import VmuIcon from "../../VmuIcon";
import scss from "../index.module.scss";
import { ERROR } from "../keys";

export default defineComponent({
  name: "InputIcon",
  props: {
    icon: prop.generic<string>(),
    isLeading: prop.boolean()
  },
  setup(props) {
    const error = injectDefined(ERROR);

    return () =>
      props.icon &&
      h(VmuIcon, {
        "aria-hidden": true,
        icon: props.icon,
        class: [scss.icon, props.isLeading ? scss.icon_leading : scss.icon_trailing, error.value ? scss.icon_error : ""]
      });
  }
});
