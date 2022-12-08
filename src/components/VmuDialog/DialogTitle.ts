import prop from "@/utilities/prop";
import scss from "./index.module.scss";

export default defineComponent({
  name: "DialogTitle",
  props: {
    dialogId: prop.generic<string>(),
    title: prop.generic<string>(),
    icon: prop.generic<string>()
  },
  setup(props) {
    return () =>
      h(
        "h1",
        {
          id: `${props.dialogId}_title`,
          class: ["vmu-text-headline-small vmu-text-on-surface", scss.title],
          style: { textAlign: props.icon ? "center" : "left" }
        },
        props.title
      );
  }
});
