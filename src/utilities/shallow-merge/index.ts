// Create a function that recursively merges two objects.
export default function shallowMerge<T, U>(target: T, source: U) {
  const output = Object.assign({}, target) as any;

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object") {
        output[key] = shallowMerge(output[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }

  return output as T & U;
}
