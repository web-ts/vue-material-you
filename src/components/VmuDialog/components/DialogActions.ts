import prop from "@/utilities/prop";
import scss from "../index.module.scss";
import VmuButton from "../../VmuButton";
import { DialogAction } from "../types";

export default defineComponent({
  name: "DialogActions",
  props: {
    actions: prop.generic<Array<DialogAction>>([])
  },
  setup(props) {
    return () =>
      h(
        "div",
        { class: scss.actions },
        props.actions.map((action) => h(VmuButton, { type: "text", onClick: action.handler }, () => action.name))
      );
  }
});
