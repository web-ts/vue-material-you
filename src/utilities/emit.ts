/**
 * Wrapper around vue's emit declaration with support for types
 */
export default function <T>() {
  return (_v: T) => true;
}
