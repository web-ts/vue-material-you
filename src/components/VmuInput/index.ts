import useInput from "@/composables/use-input";
import { InputRule } from "@/composables/use-input/types";
import log from "@/devtools/log";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import InputContainer from "./InputContainer";
import InputIcon from "./InputIcon";
import InputLabel from "./InputLabel";
import InputSupportingText from "./InputSupportingText";
import { ERROR } from "./keys";
export default defineComponent({
  name: "VmuInput",
  inheritAttrs: false,
  props: {
    id: prop.generic<string>(),
    name: prop.generic<string>(),
    modelValue: prop.generic<string | number>(),
    label: prop.generic<string>(),
    ariaLabel: prop.generic<string>(),
    rules: prop.generic<Array<InputRule> | InputRule>([]),
    leadingIcon: prop.generic<string>(),
    trailingIcon: prop.generic<string>(),
    supportingText: prop.generic<string>(),
    max: prop.generic<number>(),
    placeholder: prop.generic<string>(),
    type: prop.generic<string>("text")
  },
  emits: {
    "update:modelValue": emit<any>()
  },
  setup(props, { emit }) {
    const { model, handleChange, id, isValid, name } = useInput(props, emit);

    const error = computed(() => typeof isValid.value === "string");

    provide(ERROR, error);
    if (!props.label && !props.ariaLabel) {
      log(`VmuInput ${name.value}: A label or aria-label is required for accessibility.`, "#FFAAAA");
    }

    function onInput(e: InputEvent) {
      model.value = (e.target as HTMLInputElement)?.value;
    }

    const isFocused = ref(false);

    function onFocus() {
      isFocused.value = true;
    }

    function onBlur() {
      isFocused.value = false;
      handleChange();
    }

    const supporting = computed(() => {
      if (typeof isValid.value === "string") return isValid.value;
      if (props.supportingText) return props.supportingText;

      return "";
    });

    function focusOnInput(e: MouseEvent) {
      e.preventDefault();
      const input = document.getElementById(id.value);

      if (input) input.focus();
    }

    return () =>
      h("div", {}, [
        h(
          InputContainer,
          { leadingIcon: props.leadingIcon, trailingIcon: props.trailingIcon, onMousedown: focusOnInput },
          () => [
            h(InputIcon, { icon: props.leadingIcon, isLeading: true }),
            h(InputLabel, {
              label: props.label,
              id: id.value,
              isFocused: isFocused.value,
              model: model.value,
              leadingIcon: props.leadingIcon
            }),
            h("input", {
              id: id.value,
              name: name.value,
              class: ["vmu-text-body-large"],
              type: props.type,
              placeholder: props.placeholder,
              value: model.value,
              "aria-label": props.ariaLabel,
              onFocus,
              onBlur,
              onInput
            }),
            h(InputIcon, { icon: props.trailingIcon, isLeading: false })
          ]
        ),
        (supporting.value || props.max) &&
          h(InputSupportingText, {
            text: supporting.value,
            count: typeof model.value === "string" ? model.value?.length : 0,
            max: props.max
          })
      ]);
  }
});
