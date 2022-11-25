import prop from "@/utilities/prop";
import { getConfiguration } from "@/configuration";

export default /* @__PURE__ */ defineComponent({
  name: "VmIcon",
  props: {
    icon: prop.generic<string>(),
    props: prop.generic<Record<string, unknown>>({})
  },
  setup(props, { slots }) {
    const { icon } = getConfiguration();

    return () => {
      if (icon)
        return h(
          icon.component,
          { ...icon.defaults, ...props.props, [icon.key]: props.icon, key: props.icon ? props.icon : undefined },
          slots.default?.()
        );
    };
  }
});
