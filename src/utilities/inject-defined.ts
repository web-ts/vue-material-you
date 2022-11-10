import type { InjectionKey } from "vue";

/**
 * Wrapper around vue's inject function that ensures that the injected value is defined.
 * @param key The key of the value to inject.
 */
export default function <T>(key: InjectionKey<T>) {
  const value = inject(key);

  if (value === undefined) throw new Error(`Injection key ${key.toString()} is not defined`);

  return value;
}
