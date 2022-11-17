import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { Transition } from "vue";

export default defineComponent({
  name: "DialogFullscreenContent",
  props: {
    isOpen: prop<boolean>({ default: false, type: Boolean })
  },
  emits: {
    close: emit()
  },
  setup(props, { slots, emit }) {
    return () =>
      h(
        Transition,
        {
          name: "vmu-fullscreen-dialog-content",
          onBeforeLeave: () => {
            emit("close");
          }
        },
        () =>
          props.isOpen &&
          h("div", { class: [scss.fullscreenContents, "vmu-text-on-surface"] }, slots.default && slots.default())
      );
  }
});
