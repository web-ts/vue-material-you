import { DEREGISTER_INPUT, REGISTER_INPUT, UPDATE_INPUT_VALUE, VALIDATION_STATE } from "@/keys";
import isEmpty from "@/utilities/is-empty";
import randomString from "@/utilities/random-string";
import { InputValidityState } from "../use-form/types";
import { InputRule } from "./types";
import { validateField } from "../use-form";
export default function <T>(
  props: { modelValue: T; id?: string | null; name?: string | null; rules: Array<InputRule> | InputRule; max?: number },
  emit: { (event: "update:modelValue", value: T): void }
) {
  /**
   * The value of the input
   */
  const model = computed({ get: () => props.modelValue, set: (value: T) => emit("update:modelValue", value) });

  const random = randomString(5);

  /**
   * The id of the input. If no id is provided, a random id will be generated
   */
  const id = computed(() => (props.id ? props.id : `input_${random}`));

  /**
   * The name of the input. If no name is provided, a random name will be generated
   */
  const name = computed(() => (props.name ? props.name : `input_name_${random}`));

  const register = inject(REGISTER_INPUT, (_v: any) => 0);
  const deregister = inject(DEREGISTER_INPUT, (_v: any) => 0);

  // Register on crate
  register(name.value, model.value, props.rules);

  // Watch for reactive name changes
  watch(name, (value) => {
    deregister(value);
    register(value, model, props.rules);
  });

  // Update the input value when the rules change
  watch(
    () => props.rules,
    () => {
      //TODO: update rules on the form as well
      updateInputValue(name.value, model.value);
    }
  );

  const validity = inject(
    VALIDATION_STATE,
    reactive<Record<string, InputValidityState>>({ [name.value]: { valid: true, touched: !isEmpty(model.value) } })
  );

  const updateInputValue = inject(UPDATE_INPUT_VALUE, async (name: string, value: T) => {
    validity[name] = { ...validity[name], valid: await validateField(value, props.rules) };
  });

  watch(model, (value) => {
    // If we have a max length and we have a string, slice it to the max length
    if (props.max && typeof value === "string" && value.length > props.max) {
      (model.value as string) = value.slice(0, props.max);
    } else {
      updateInputValue(name.value, value);
    }
  });

  /**
   * Computed property to determine if the input is valid. If the input has an error, it will returned here
   */
  const isValid = computed(() => (validity[name.value].touched ? validity[name.value].valid : true));

  /**
   * Computed property to determine if the input is clear/untouched
   */
  const isClear = computed(() => validity[name.value].touched);

  /**
   * Handle change events, e.g. call this on blur
   */
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
