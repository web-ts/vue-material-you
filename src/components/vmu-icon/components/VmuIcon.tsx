import prop from "vue-typed-props";
import { config } from "@/configuration";
import useRender from "@/composables/use-render";

export const VmuIcon = /* @__PURE__ */ defineComponent({
  name: "VmuIcon",
  props: {
    icon: prop.string(),
    props: prop.object<Record<string, unknown>>({})
  },
  setup(props, { slots }) {
    useRender(() => (
      <config.icon.component
        {...{
          ...config.icon.defaults,
          ...props.props,
          [config.icon.key]: props.icon,
          key: props.icon ? props.icon : undefined
        }}
      >
        {slots.default?.()}
      </config.icon.component>
    ));

    return {};
  }
});
