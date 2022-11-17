import { VmuButton } from "@/index";
import ComponentLoader from "../../ComponentLoader";

export default defineComponent({
  name: "Buttons",
  setup() {
    const buttons = {
      title: "Buttons",
      description: "Sample buttons with all the styles they can have.",
      componentMatrix: [
        [
          h(VmuButton, {}, "Filled"),
          h(VmuButton, { type: "outlined" }, "Outlined"),
          h(VmuButton, { type: "text" }, "Text"),
          h(VmuButton, { type: "elevated" }, "Elevated"),
          h(VmuButton, { type: "tonal" }, "Tonal")
        ],
        [
          h(VmuButton, { disabled: true }, "Filled"),
          h(VmuButton, { type: "outlined", disabled: true }, "Outlined"),
          h(VmuButton, { type: "text", disabled: true }, "Text"),
          h(VmuButton, { type: "elevated", disabled: true }, "Elevated"),
          h(VmuButton, { type: "tonal", disabled: true }, "Tonal")
        ],
        [
          h(VmuButton, { icon: "mdi:plus" }, "Filled"),
          h(VmuButton, { type: "outlined", icon: "mdi:plus" }, "Outlined"),
          h(VmuButton, { type: "text", icon: "mdi:plus" }, "Text"),
          h(VmuButton, { type: "elevated", icon: "mdi:plus" }, "Elevated"),
          h(VmuButton, { type: "tonal", icon: "mdi:plus" }, "Tonal")
        ]
      ]
    };

    return () => h("div", { style: "margin: 4rem" }, [h(ComponentLoader, { data: buttons })]);
  }
});
