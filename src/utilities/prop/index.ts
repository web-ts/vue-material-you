import { PropType } from "vue";

export type GenericProp<T> = { type: PropType<T>; default: T };

function generic<T>(defaultValue?: undefined): GenericProp<T | undefined>;
function generic<T>(defaultValue: T): GenericProp<T>;
function generic<T>(defaultValue?: T) {
  const prop = {
    type: undefined as unknown as PropType<T>,
    default: (typeof defaultValue === "object" ? () => defaultValue : defaultValue) as T
  };

  return prop;
}

export type RequiredProp<T> = { type: PropType<T>; default: T; required: true };

function required<T>(defaultValue?: undefined): RequiredProp<T>;
function required<T>(defaultValue: T): RequiredProp<T>;
function required<T>(defaultValue?: T) {
  const prop = {
    type: undefined as unknown as PropType<T>,
    default: (typeof defaultValue === "object" ? () => defaultValue : defaultValue) as T,
    required: true
  };

  return prop;
}

function boolean(defaultValue?: undefined): GenericProp<boolean | undefined>;
function boolean(defaultValue: boolean): GenericProp<boolean>;
function boolean(defaultValue?: boolean) {
  const prop = {
    type: Boolean as unknown as PropType<boolean | undefined>,
    default: defaultValue
  };

  return prop;
}

export default {
  boolean,
  generic,
  required
};
