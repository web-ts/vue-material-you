import { DEREGISTER_INPUT, REGISTER_INPUT, UPDATE_INPUT_VALUE, VALIDATION_STATE } from "@/keys";
import injectDefined from "@/utilities/inject-defined";
import randomString from "@/utilities/random-string";
import { InputRule } from "./types";

export default function <T>(
  props: { modelValue: T; id?: string | null; name?: string | null; rules: Array<InputRule> | InputRule; max?: number },
  emit: { (event: "update:modelValue", value: T): void }
) {
  const model = computed({ get: () => props.modelValue, set: (value: T) => emit("update:modelValue", value) });
  const random = randomString(5);
  const id = computed(() => (props.id ? props.id : `input_${random}`));

  const name = computed(() => (props.name ? props.name : `input_name_${random}`));

  const register = injectDefined(REGISTER_INPUT);
  const deregister = injectDefined(DEREGISTER_INPUT);

  // Register on crate
  register(name.value, model.value, props.rules);

  // Watch for reactive name changes
  watch(name, (value) => {
    deregister(value);
    register(value, model, props.rules);
  });

  const updateInputValue = injectDefined(UPDATE_INPUT_VALUE);

  watch(model, (value) => {
    if (props.max && typeof value === "string" && value.length > props.max) {
      (model.value as string) = value.slice(0, props.max);
    } else {
      updateInputValue(name.value, value);
    }
  });

  const validity = injectDefined(VALIDATION_STATE);

  const isValid = computed(() => (validity[name.value].touched ? validity[name.value].valid : true));
  const isClear = computed(() => validity[name.value].touched);

  function handleChange() {
    validity[name.value].touched = true;
    updateInputValue(name.value, model.value);
  }

  return {
    id,
    name,
    model,
    isValid,
    isClear,
    handleChange
  };
}
