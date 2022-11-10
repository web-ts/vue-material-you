import { Ref } from "vue";

/**
 * Helper for the v-model directive to be used in render functions.
 * @param param The ref to be used as a model
 */
export default function <T>(param: Ref<T> | T) {
  return {
    modelValue: unref(param),
    "onUpdate:modelValue": (value: T) => {
      if (isRef(param)) {
        param.value = value;
      } else {
        param = value;
      }
    }
  };
}
