import VmuMenu from "@/components/VmuMenu";
import prop from "@/utilities/prop";

export default defineComponent({
  name: "InputDropdown",
  props: {
    options: prop.generic<Array<any>>(),
    optionLabel: prop.generic<string>("label"),
    optionValue: prop.generic<string>("value")
  },
  setup() {
    return () => h(VmuMenu, {});
  }
});
