/**
 * Generates a random string of the given length.
 * @param length The length of the string to generate.
 */
export default function (length = 20) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}
