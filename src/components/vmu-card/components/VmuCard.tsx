import useRender from "@/composables/use-render";
import prop from "vue-typed-props";
import scss from "../scss/VmuCard.module.scss";
import { CardType } from "../types";

export const VmuCard = /* @__PURE__ */ defineComponent({
  name: "VmuCard",
  props: {
    type: prop.generic<CardType>("elevated")
  },
  setup(props, { slots }) {
    const classList = computed(() => [scss.card, scss[`card_${props.type}`]]);

    useRender(() => <div class={classList.value}>{slots.default?.()}</div>);

    return {};
  }
});
