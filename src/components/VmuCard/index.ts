import prop from "@/utilities/prop";
import scss from "./index.module.scss";
export default defineComponent({
  name: "VmuCard",
  props: {
    type: prop.generic<"elevated" | "filled" | "outlined">("elevated")
  },
  setup(props, { slots }) {


    const classList = computed(() => ({
        [scss.card]: true,
        [scss.card_elevated]: props.type === "elevated",
        [scss.card_filled]: props.type === "filled",
        [scss.card_outlined]: props.type === "outlined"
      }));

    return () => h("div", { class: classList.value }, slots.default?.());
  }
});
