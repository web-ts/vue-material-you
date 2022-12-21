import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import useWindowDimensions from "@/composables/use-window-dimensions";
import { StyleValue, Teleport, Transition } from "vue";

export default defineComponent({
  name: "Scrim",
  props: {
    id: prop.generic<string>(),
    isLast: prop.boolean(false),
    open: prop.boolean(false),
    style: prop.generic<StyleValue>(),
    zIndex: prop.generic(100)
  },
  emits: {
    "update:modelValue": emit<boolean>(),
    open: emit()
  },
  setup(props, { emit, slots, attrs }) {
    async function onBeforeEnter() {
      await nextTick();
      emit("open");
    }

    const { height } = useWindowDimensions();

    const style = computed(() => [
      props.style,
      {
        zIndex: props.zIndex,
        height: `${height.value}px`
      }
    ]);

    const scrimProps = computed(() => ({
      ...attrs,
      id: props.id,
      style: style.value,
      tabindex: !props.isLast ? -1 : undefined,
      role: "dialog",
      "aria-hidden": !props.isLast,
      "aria-modal": "true",
      "aria-labelledby": `${props.id}_title`,
      "aria-describedby": `${props.id}_description`
    }));

    return () =>
      h(
        Teleport,
        { to: "body" },
        h(
          Transition,
          {
            name: "vmu-scrim",
            onBeforeEnter
          },
          () => props.open && h("div", { class: scss.scrim, ...scrimProps.value }, slots.default && slots.default())
        )
      );
  }
});
