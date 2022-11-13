import prop from "@/utilities/prop";
import scss from "./index.module.scss";

export default defineComponent({
  name: "DialogTitle",
  props: {
    dialogId: prop<string>(),
    title: prop<string>(),
    icon: prop<string>()
  },
  setup(props) {
    return () =>
      h(
        "h1",
        {
          id: `${props.dialogId}_title`,
          class: ["vmu-text-headline-small", scss.title],
          style: { textAlign: props.icon ? "center" : "left" }
        },
        props.title
      );
  }
});
