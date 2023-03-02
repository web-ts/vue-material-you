import type { InjectionKey, WritableComputedRef, Ref } from "vue";

const TAB_ARRAY: InjectionKey<Ref<Array<string>>> = Symbol("TAB_ARRAY");
const SWITCH_ARRAY: InjectionKey<Ref<Array<string>>> = Symbol("SWITCH_ARRAY");
const CURRENT_TAB: InjectionKey<WritableComputedRef<number>> = Symbol("CURRENT_TAB");
const SWITCH_TAB: InjectionKey<(index: number) => void> = Symbol("SWITCH_TAB");

export default {
  TAB_ARRAY,
  SWITCH_ARRAY,
  CURRENT_TAB,
  SWITCH_TAB
};
