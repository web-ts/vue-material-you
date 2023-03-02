import prop from "@/utilities/prop";

import scss from "./index.module.scss";

export default defineComponent({
  name: "VmuListItem",
  props: {
    headline: prop.generic<string>(),
    supportingText: prop.generic<string>()
  },
  setup(props) {
    const classList = computed(() => ({
      [scss.item]: true
    }));

    const style = computed(() => {
      let height = 40;

      if (props.headline) height += 16;
      if (props.supportingText) height += 16;

      return {
        height: `${height}px`
      };
    });

    return () =>
      h("li", { class: classList.value, style: style.value }, [
        h("h1", { class: [scss.headline, "vmu-text-body-large"] }, props.headline)
      ]);
  }
});
