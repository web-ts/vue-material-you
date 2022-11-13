import prop from "@/utilities/prop";
import VmuButton from "../VmuButton";
import { DialogAction } from "./types";
import scss from "./index.module.scss";

export default defineComponent({
  name: "DialogActions",
  props: {
    actions: prop<Array<DialogAction>>(() => [])
  },
  setup(props) {
    return () =>
      h(
        "div",
        { class: scss.actions },
        props.actions.map((action) => h(VmuButton, { type: "text", onClick: action.handler }, action.name))
      );
  }
});
