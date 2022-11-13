import prop from "@/utilities/prop";
import VmuIcon from "../VmuIcon";
import scss from "./index.module.scss";

export default defineComponent({
  name: "DialogIcon",
  props: {
    icon: prop<string>()
  },
  setup(props) {
    return () =>
      props.icon &&
      h(
        "div",
        { class: scss.icon },
        h(VmuIcon, {
          icon: props.icon,
          props: { width: 24, height: 24 }
        })
      );
  }
});
