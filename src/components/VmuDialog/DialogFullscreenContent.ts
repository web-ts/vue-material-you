import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { Transition } from "vue";

export default defineComponent({
  name: "DialogFullscreenContent",
  props: {
    isOpen: prop.boolean(false),
    attributes: prop.generic<Record<string, unknown>>()
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
          h(
            "div",
            { ...props.attributes, class: [scss.fullscreenContents, "vmu-text-on-surface", props.attributes?.class] },
            slots.default && slots.default()
          )
      );
  }
});
