import prop from "@/utilities/prop";

export default defineComponent({
  name: "DialogDescription",
  props: {
    dialogId: prop.generic<string>(),
    description: prop.generic<string>()
  },
  setup(props) {
    return () =>
      h(
        "p",
        {
          id: `${props.dialogId}_description`,
          class: "vmu-text-body-medium vmu-text-on-surface"
        },
        props.description
      );
  }
});
