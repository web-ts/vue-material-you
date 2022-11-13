import prop from "@/utilities/prop";

export default defineComponent({
  name: "DialogDescription",
  props: {
    dialogId: prop<string>(),
    description: prop<string>()
  },
  setup(props) {
    return () =>
      h(
        "p",
        {
          id: `${props.dialogId}_description`,
          class: "vmu-text-body-medium"
        },
        props.description
      );
  }
});
