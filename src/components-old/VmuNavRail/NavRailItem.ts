import prop from "@/utilities/prop";
import { NavItem } from "./types";
import scss from "./index.module.scss";
import VmuIcon from "../VmuIcon";
import emit from "@/utilities/emit";
export default defineComponent({
  name: "NavRailItem",
  props: {
    index: prop.required<number>(),
    item: prop.required<NavItem>(),
    selected: prop.boolean()
  },
  emits: {
    select: emit<number>()
  },
  setup(props, { emit }) {
    const classList = computed(() => ({
      [scss.item]: true
    }));

    return () =>
      h(
        "button",
        {
          class: classList.value,
          onClick: (e: PointerEvent) => {
            props.item.action?.(e);
            emit("select", props.index);
          }
        },
        [
          h(
            "span",
            { class: [scss.iconWrapper, props.selected ? scss.iconWrapper_selected : ""] },
            h(VmuIcon, { class: scss.icon, icon: props.item.icon, width: 24, height: 24 })
          ),
          h("span", { class: [scss.label, "vmu-text-label-medium"] }, props.item.label)
        ]
      );
  }
});
