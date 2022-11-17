import prop from "@/utilities/prop";

interface LoaderData {
  title: string;
  description: string;
  componentMatrix: Array<Array<any>>;
}

export default defineComponent({
  name: "ComponentLoader",
  props: {
    data: prop<LoaderData>()
  },

  setup(props) {
    return () =>
      h("div", {style:"margin-bottom: 2rem"}, [
        h("div", { class: "vmu-text-on-background vmu-text-title-large", style: "margin-bottom: 1rem" }, props.data.title),
        h("div", { class: "vmu-text-on-background", style: "margin-bottom: 1rem" }, props.data.description),
        h(
          "div",
          { style: "display: flex; flex-direction: column; gap: 1rem" },
          props.data.componentMatrix.map((components) =>
            h(
              "div",
              { style: "display: flex; gap: 1rem;" },
              components.map((data) => data)
            )
          )
        )
      ]);
  }
});
