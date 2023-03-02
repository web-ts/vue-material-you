import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "../index.module.scss";
import { Transition } from "vue";

export default /* @__PURE__ */ defineComponent({
  name: "DialogContent",
  props: {
    attrs: prop.generic<Record<string, unknown>>(),
    isOpen: prop.boolean(false)
  },
  emits: {
    close: emit()
  },
  setup(props, { slots, emit }) {
    const size = ref(0);
    const dialog = ref<HTMLElement>();

    let observer: ResizeObserver | undefined;

    onMounted(() => {
      observer = new ResizeObserver((event) => {
        if (event[0]) {
          size.value = event[0].target.scrollHeight;
        }
      });
    });

    watch(dialog, () => {
      if (dialog.value) {
        size.value = dialog.value.scrollHeight;
        observer?.observe(dialog.value);
      }
    });

    onBeforeUnmount(() => {
      observer?.disconnect();
    });

    return () =>
      h(
        Transition,
        {
          name: "vmu-dialog-content",
          onBeforeLeave: () => emit("close")
        },
        () =>
          props.isOpen &&
          h(
            "div",
            {
              ref: dialog,
              class: [scss.content, "vmu-text-on-surface", props.attrs?.class],
              style: `--vmu-max-height: ${size.value}px`,
              ...props.attrs
            },
            slots.default?.()
          )
      );
  }
});
