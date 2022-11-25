import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import closeIcon from "@/icons/close.svg?raw";
import VmuButton from "../VmuButton";
import { DialogAction } from "./types";
import emit from "@/utilities/emit";
import { getMessage } from "@/messages";

export default defineComponent({
  name: "DialogFullscreenHeader",
  props: {
    dialogId: prop.generic<string>(),
    title: prop.generic<string>(),
    actions: prop.generic<Array<DialogAction>>([])
  },
  emits: {
    close: emit()
  },
  setup(props, { emit }) {
    return () =>
      h("div", { class: scss.header }, [
        h("button", {
          class: scss.header___close,
          "aria-label": getMessage("dialog.actions.cancel").value,
          onClick: () => emit("close"),
          innerHTML: closeIcon
        }),
        h(
          "h1",
          {
            id: `${props.dialogId}_title`,
            class: ["vmu-text-title-large vmu-text-on-surface", scss.header___title]
          },
          props.title
        ),
        props.actions.map((action) => h(VmuButton, { type: "text", onClick: action.handler }, () => action.name))
      ]);
  }
});
