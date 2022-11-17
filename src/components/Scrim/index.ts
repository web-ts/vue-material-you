import useWindowDimensions from "@/composables/use-window-dimensions";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import { StyleValue, Teleport, Transition } from "vue";
import scss from "./index.module.scss";

export default defineComponent({
  name: "Scrim",
  props: {
    modelValue: prop<boolean>({ default: false, type: Boolean }),
    zIndex: prop<number>(100),
    style: prop<StyleValue>(),
    id: prop<string>(),
    isLast: prop<boolean>({ default: false, type: Boolean })
  },
  emits: {
    "update:modelValue": emit<boolean>(),
    open: emit()
  },
  setup(props, { emit, slots, attrs }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });

    async function onBeforeEnter() {
      await nextTick();
      emit("open");
    }

    const { height } = useWindowDimensions();

    const style = computed(() => [
      props.style,
      {
        top: 0,
        left: 0,
        position: "fixed",
        width: "100vw",
        height: `${height.value}px`,
        zIndex: props.zIndex
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
        // Scrim Transition
        h(
          Transition,
          {
            name: "vmu-scrim",
            onBeforeEnter
          },
          () => model.value && h("div", { class: scss.scrim, ...scrimProps.value }, slots.default && slots.default())
        )
      );
  }
});
