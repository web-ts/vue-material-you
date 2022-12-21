import prop from "@/utilities/prop";
import scss from "./index.module.scss";

export default defineComponent({
  name: "VmuCard",
  props: {
    type: prop.generic<"elevated" | "filled" | "outlined">("elevated")
  },
  setup(props, { slots }) {
    const classList = computed(() => [scss.card, scss[`card_${props.type}`]]);

    return () => h("div", { class: classList.value }, slots.default?.());
  }
});
