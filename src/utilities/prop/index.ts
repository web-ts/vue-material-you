import { PropType } from "vue";

type PropConstructor = BooleanConstructor | StringConstructor | NumberConstructor | ArrayConstructor | Object;

type DefaultObject<T> = { default: T | (() => T) | undefined; type: Array<PropConstructor> | PropConstructor };

/**
 * Wrapper around vue's prop declaration that provides support for types.
 * @param defaultValue The default value of the prop.
 * @param required Whether the prop is required.
 */
export default function <T>(
  defaultValue: T | (() => T) | DefaultObject<T> | undefined = undefined,
  required: boolean | undefined = undefined
) {
  if (defaultValue && typeof defaultValue === "object")
    return {
      type: (defaultValue as DefaultObject<T>).type as PropType<T>,
      default: (defaultValue as DefaultObject<T>).default
    };

  return {
    type: undefined as unknown as PropType<T>,
    default: defaultValue,
    required
  };
}
