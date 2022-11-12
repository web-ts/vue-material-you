import { Ref } from "vue";

/**
 * Helper for the v-model directive to be used in render functions. Does not work with `reactive` only with `ref`.
 * @param param The ref to be used as a model
 */
export default function <T>(param: Ref<T>) {
  return {
    modelValue: unref(param),
    "onUpdate:modelValue": (value: T) => {
      param.value = value;
    }
  };
}
