import { registerToNode, removeFromNodes, updateFormState } from "@/devtools/inspector";
import { DEREGISTER_INPUT, REGISTER_INPUT, UPDATE_INPUT_VALUE, VALIDATION_STATE } from "@/keys";
import isEmpty from "@/utilities/is-empty";
import randomString from "@/utilities/random-string";
import { InputRule } from "../use-input/types";
import { InputValidityState } from "./types";

const globalState: Record<string, any> = reactive({});

export async function validateField(value: any, rules: Array<InputRule> | InputRule) {
  let valid: boolean | string = true;

  if (Array.isArray(rules)) {
    for (const rule of rules) {
      // eslint-disable-next-line no-await-in-loop
      const result = await rule(value);

      if (result !== true) {
        valid = result;
        break;
      }
    }
  } else {
    valid = await rules(value);
  }

  return valid;
}

/**
 * Form Validator
 */
export default function (
  props: { id?: string | null },
  emit: ((event: "valid", _v: Record<string, any>) => void) & ((event: "invalid", _v: Record<string, any>) => void)
) {
  const id = computed(() => (props.id ? props.id : `form_${randomString(5)}`));

  /**
   * The state of the form. Holds references to all input elements
   */
  const state = reactive<Record<string, any>>({});

  const rules = reactive<Record<string, Array<InputRule> | InputRule>>({});

  const validity = reactive<Record<string, InputValidityState>>({});

  provide(VALIDATION_STATE, validity);

  /**
   * Update the state of a specific input and run the validation rules if they exist
   * @param name The name of the input
   * @param value The value of the input
   */
  async function updateInputValue(name: string, value: any) {
    state[name] = value;

    validity[name] = { ...validity[name], valid: await validateField(value, rules[name]) };
  }

  provide(UPDATE_INPUT_VALUE, updateInputValue);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    let hasErrors = false;

    for (const element of Object.entries(state)) {
      const [name, value] = element;

      // eslint-disable-next-line no-await-in-loop
      validity[name] = { touched: true, valid: await validateField(value, rules[name]) };
      if (validity[name].valid !== true) {
        hasErrors = true;
      }
    }
    if (hasErrors) emit("invalid", { state, validity });
    else emit("valid", { state, validity });
  }

  /**
   * Register an input to the form state
   * @param name The name of the input
   * @param defaultValue The default value of the input
   */
  function registerInput(name: string, defaultValue: any, rulesArray: Array<InputRule>) {
    state[name] = defaultValue;
    rules[name] = rulesArray;
    validity[name] = {
      valid: true,
      touched: !isEmpty(defaultValue)
    };
  }

  provide(REGISTER_INPUT, registerInput);

  /**
   * Remove an input from the form state
   * @param name The name of the input that we want to remove
   */
  function deregisterInput(name: string) {
    delete state[name];
  }

  provide(DEREGISTER_INPUT, deregisterInput);
  //#region Devtools
  if (process.env.NODE_ENV === "development" || __VUE_PROD_DEVTOOLS__) {
    // Register the form to the global state
    globalState[id.value] = { state, validity };
    // Register the form to the node inspector
    registerToNode("forms", { id: id.value, label: id.value });

    // Watch for id changes
    watch(id, (oldVal, newVal) => {
      removeFromNodes("forms", oldVal);
      registerToNode("forms", { id: newVal, label: newVal });

      // Remove from global state
      delete globalState[oldVal];
      // Add to global state
      globalState[newVal] = { state, validity };
    });

    watch(globalState, () => {
      updateFormState(globalState);
    });

    onBeforeUnmount(() => {
      delete globalState[id.value];
      removeFromNodes("forms", id.value);
    });
  }
  //#endregion

  return {
    state,
    rules,
    validity,
    handleSubmit,
    id
  };
}
