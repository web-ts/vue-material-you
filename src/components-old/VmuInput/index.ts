import useInput from "@/composables/use-input";
import { InputRule } from "@/composables/use-input/types";
import log from "@/devtools/log";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import vModel from "@/utilities/v-model";
import VmuMenu from "../VmuMenu";
import InputContainer from "./components/InputContainer";
// import InputDropdown from "./components/InputDropdown";
import InputIcon from "./components/InputIcon";
import InputLabel from "./components/InputLabel";
import InputSupportingText from "./components/InputSupportingText";
import { ERROR } from "./keys";
export default defineComponent({
  name: "VmuInput",
  inheritAttrs: false,
  props: {
    id: prop.generic<string>(),
    name: prop.generic<string>(),
    modelValue: prop.generic<any>(),
    options: prop.generic<Array<any>>(),
    optionLabel: prop.generic<string>("label"),
    optionValue: prop.generic<string>("value"),
    label: prop.generic<string>(),
    ariaLabel: prop.generic<string>(),
    rules: prop.generic<Array<InputRule> | InputRule>([]),
    readonly: prop.boolean(false),
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
  setup(props, { emit, attrs }) {
    const { model, handleChange, id, isValid, name } = useInput(props, emit);

    const error = computed(() => typeof isValid.value === "string");

    provide(ERROR, error);
    if (!props.label && !props.ariaLabel) {
      log(`VmuInput ${name.value}: A label or aria-label is required for accessibility.`, "#FFAAAA");
    }

    function onInput(e: InputEvent) {
      const value = (e.target as HTMLInputElement)?.value;

      model.value = props.type === "number" ? Number(value) : value;
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

    const menu = ref<typeof VmuMenu | null>(null);
    const showMenu = ref(false);

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") showMenu.value = true;
      if (menu.value) {
        menu.value.onKeydown(e);
      }
    }

    const isFocused = ref(false);

    function onFocus() {
      isFocused.value = true;
      showMenu.value = true;
    }

    function onBlur() {
      isFocused.value = false;
      handleChange();
    }

    return () =>
      h("div", { ...attrs }, [
        h(
          InputContainer,
          {
            leadingIcon: props.leadingIcon,
            trailingIcon: props.trailingIcon,
            onMousedown: focusOnInput,
            onClick: () => {
              showMenu.value = true;
            }
          },
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
              readonly: props.readonly || props.options,
              onFocus,
              onBlur,
              onInput,
              onKeydown
            }),
            h(InputIcon, { icon: props.trailingIcon, isLeading: false }),
            props.options &&
              isFocused.value &&
              showMenu.value &&
              h(VmuMenu, {
                ...vModel(model),
                ref: menu,
                options: props.options,
                optionLabel: props.optionLabel,
                optionValue: props.optionValue,
                onSelect: () => (showMenu.value = false)
              })
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
