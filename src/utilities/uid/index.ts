export default function (length = 20) {
  return [...Array(Math.max(length - 4, 1))].reduce(
    (prev: string, _) => `${prev}${Math.random().toString(36)[2]}`,
    "uid-"
  );
}
