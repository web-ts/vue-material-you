import useId from "@/composables/use-id";
import useModel from "@/composables/use-model";
import { VmuSheet } from "@/index";
import emit from "@/utilities/emit";
// import getWindow from "@/utilities/get-window";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";

export default defineComponent({
  name: "VmuMenu",
  props: {
    modelValue: prop.generic<any>(),
    id: prop.generic<string>(),
    options: prop.required<Array<any>>(),
    optionLabel: prop.generic<string>("label"),
    optionValue: prop.generic<string>("value")
  },
  emits: {
    "update:modelValue": emit<any>(),
    select: emit<any>()
  },
  setup(props, { expose, emit }) {
    const model = useModel(props, emit);
    const id = useId(props);
    const focused = ref(-1);

    function scrollToCurrentElement(end = false) {
      const element = document.getElementById(`${id.value}-item-${focused.value}`) as HTMLDivElement | undefined;

      if (element) {
        element.scrollIntoView({ block: "center" });
        if (focused.value === 0 || focused.value === props.options.length - 1)
          element.parentElement?.scrollBy({ left: 0, top: end ? 8 : -8 });
      }
    }

    function down() {
      if (focused.value + 1 < props.options.length) {
        focused.value++;
      }
      scrollToCurrentElement(true);
    }

    function up() {
      if (focused.value - 1 >= 0) {
        focused.value--;
      }

      scrollToCurrentElement();
    }

    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          up();
          e.preventDefault();
          break;
        case "ArrowDown":
          down();
          e.preventDefault();
          break;
        case "Enter":
          e.preventDefault();
          onClick(props.options[focused.value]);
          break;
      }
    }

    expose({
      onKeydown
    });

    function onClick(item: any) {
      model.value = item[props.optionValue];
      emit("select", item);
    }

    return () =>
      h(
        "div",
        { id: id.value, class: scss.menu },
        props.options.map((item: any, index) =>
          h(
            VmuSheet,
            {
              id: `${id.value}-item-${index}`,
              key: index,
              class: [
                scss.menu___item,
                "vmu-ripple-on-surface vmu-text-label-large",
                index === focused.value ? scss.menu___item_focused : ""
              ],
              onClick: (e: MouseEvent) => {
                e.stopPropagation();
                onClick(item);
              }
            },
            () => item[props.optionLabel]
          )
        )
      );
  }
});
