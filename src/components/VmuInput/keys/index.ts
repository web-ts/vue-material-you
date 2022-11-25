import { ComputedRef, InjectionKey } from "vue";

export const ERROR: InjectionKey<ComputedRef<boolean>> = Symbol("ERROR");