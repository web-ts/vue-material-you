import prop from "vue-typed-props";
import scss from "../scss/VmuButton.module.scss";
import { VmuIcon } from "@/components/vmu-icon";
import { VmuSheet } from "@/components/vmu-sheet";
import { ButtonSize, ButtonType } from "../types";

import spinnerIcon from "@/icons/spinner.svg?raw";
import useRender from "@/composables/use-render";

export const VmuButton = /* @__PURE__ */ defineComponent({
  name: "VmButton",
  props: {
    disabled: prop.boolean(),
    loading: prop.boolean(),
    reset: prop.boolean(),
    submit: prop.boolean(),
    color: prop.string("primary"),
    href: prop.string(),
    icon: prop.string<string>(),
    iconPosition: prop.string<"left" | "right">("left"),
    size: prop.string<ButtonSize>("large"),
    type: prop.string<ButtonType>("filled")
  },
  setup(props, { slots }) {
    const colorMapping = computed<Record<ButtonType, string>>(() => ({
      filled: `on-${props.color}`,
      outlined: `${props.color}`,
      text: `${props.color}`,
      elevated: `${props.color}`,
      tonal: "on-secondary-container"
    }));

    const classList = computed(() => [
      scss.button,
      scss[`button_${props.type}`],
      scss[`button_${props.size}${props.icon ? "_icon" : ""}`],
      `vmu-ripple-${colorMapping.value[props.type]} vmu-text-label-${props.size}`
    ]);

    const style = computed(() => ({
      color: props.loading ? "transparent" : undefined,
      "--vmu-button-color": `rgb(var(--vmu-color-${props.color}))`,
      "--vmu-button-on-color": `rgb(var(--vmu-color-on-${props.color}))`
    }));
    /**
     * Native type of the button. If the button is a submit or reset button, the native type will be set to the respective type.
     */
    const nativeType = computed(() => {
      if (props.submit) return "submit";
      if (props.reset) return "reset";

      return "button";
    });
    const tag = computed(() => (props.href ? "a" : "button"));
    const isDisabled = computed(() => props.disabled || props.loading);

    useRender(() => (
      <VmuSheet
        tag={tag.value}
        class={classList.value}
        style={style.value}
        {...{ href: props.href, type: nativeType.value, disabled: isDisabled.value }}
      >
        {props.icon
          ? [<VmuIcon key="button-icon" icon={props.icon} />, slots.default?.({ isDisabled: isDisabled.value })]
          : slots.default?.()}
        {props.loading && <span class={scss.button__loader} innerHTML={spinnerIcon} aria-hidden="true" />}
      </VmuSheet>
    ));

    return {};
  }
});
