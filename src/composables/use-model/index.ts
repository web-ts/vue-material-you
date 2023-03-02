import { WritableComputedRef } from "vue";

export default function <T>(
  props: { modelValue: T },
  emit: { (event: "update:modelValue", value: T): void }
): WritableComputedRef<T>;
export default function <T>(
  props: { modelValue?: T },
  emit: { (event: "update:modelValue", value?: T): void }
): WritableComputedRef<T | undefined>;
export default function <T>(props: { modelValue?: T }, emit: { (event: "update:modelValue", value?: T): void }) {
  const model = computed({
    get: () => props.modelValue,
    set: (value?: T) => emit("update:modelValue", value)
  });

  return model;
}
