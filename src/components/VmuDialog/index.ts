import useModel from "@/composables/use-model";
import useWindowDimensions from "@/composables/use-window-dimensions";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { renderSlot, StyleValue, Teleport, Transition } from "vue";
import VmuButton from "../VmuButton";
import useId from "@/composables/use-id";
import VmuIcon from "../VmuIcon";
import useDialog from "../../composables/use-dialog";

export default defineComponent({
  name: "VmDialog",
  inheritAttrs: false,
  props: {
    id: prop<string>(),
    zIndex: prop<number>(100),
    modelValue: prop<boolean>({ default: undefined, type: Boolean }),
    fullScreen: prop<boolean>({ default: true, type: Boolean }),
    style: prop<StyleValue>(),
    title: prop<string>(),
    description: prop<string>(),
    icon: prop<string>(),
  },
  emits: {
    "update:modelValue": emit<boolean>(),
  },
  setup(props, { emit, attrs, slots }) {
    const { height } = useWindowDimensions();
    const id = useId(props);
    const open = useModel(props, emit);
    const { isLast } = useDialog(id, open);
    const style = computed(() => [
      props.style,
      {
        top: 0,
        left: 0,
        position: "fixed",
        width: "100vw",
        height: `${height.value}px`,
        zIndex: props.zIndex,
      },
    ]);

    return () =>
      h(
        Teleport,
        { to: "body" },
        h(
          Transition,
          { name: "fade" },
          () =>
            open.value &&
            h(
              "div",
              {
                class: scss.dialog,
                ...attrs,
                id: id.value,
                style: style.value,
                "aria-hidden": !isLast.value,
                tabindex: !isLast.value ? -1 : undefined,
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": `${id.value}_title`,
                "aria-describedby": `${id.value}_description`,
              },
              h(Transition, { name: "menu", appear: true }, () =>
                h("div", { class: scss.contents }, [
                  props.icon &&
                    h(
                      "div",
                      { class: scss.icon },
                      h(VmuIcon, {
                        icon: props.icon,
                        props: { width: 24, height: 24 },
                      })
                    ),
                  h(
                    "h1",
                    {
                      id: `${id.value}_title`,
                      class: ["md-text-headline-small", scss.title],
                      style: { textAlign: props.icon ? "center" : "left" },
                    },
                    props.title
                  ),
                  h(
                    "p",
                    {
                      id: `${id.value}_description`,
                      class: "md-text-body-medium",
                    },
                    props.description
                  ),
                  renderSlot(slots, "default"),
                  h("div", { class: scss.actions }, [
                    h(
                      VmuButton,
                      { type: "text", onClick: () => (open.value = false) },
                      "Cancel"
                    ),
                    h(
                      VmuButton,
                      { type: "text", onClick: () => (open.value = false) },
                      "Save"
                    ),
                  ]),
                ])
              )
            )
        )
      );
  },
});
