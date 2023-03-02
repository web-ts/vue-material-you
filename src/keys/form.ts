import { InputValidityState } from "@/composables/use-form/types";
import { InputRule } from "@/composables/use-input/types";
import { InjectionKey } from "vue";

export const REGISTER_INPUT: InjectionKey<
  (name: string, defaultValue: any, rules: Array<InputRule> | InputRule) => void
> = Symbol("REGISTER_INPUT");
export const DEREGISTER_INPUT: InjectionKey<(name: string) => void> = Symbol("DEREGISTER_INPUT");
export const UPDATE_INPUT_VALUE: InjectionKey<(name: string, value: any) => void> = Symbol("UPDATE_INPUT_VALUE");
export const VALIDATION_STATE: InjectionKey<Record<string, InputValidityState>> = Symbol("VALIDATION_STATE");
