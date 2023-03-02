export default function () {
  const inFocus = ref(false);

  function onFocus() {
    inFocus.value = true;
  }

  function onBlur() {
    inFocus.value = false;
  }

  return { inFocus, events: { onFocus, onBlur } };
}
