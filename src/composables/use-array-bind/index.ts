import { Ref } from "vue";

/**
 * Link a component to a given Ref Array, creating an unique id and the necessary events.
 */
export default function (id: Ref<string>, array: Ref<Array<string>>) {
  function bind() {
    if (!array.value.find((x) => x === id.value) && id.value) {
      array.value.push(id.value);
    }
  }

  function unbind() {
    array.value = array.value.filter((x) => x !== id.value);
  }

  const index = computed(() => array.value.findIndex((x) => x === id.value));

  onBeforeUnmount(() => {
    unbind();
  });

  return { index, bind, unbind };
}
