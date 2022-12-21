import randomString from "@/utilities/random-string";
import { Ref } from "vue";

/**
 * Link a component to a given Ref Array, creating an unique id and the necessary events.
 */
export default function (array: Ref<Array<string>>) {
  // Create a random id
  const id = ref(randomString());

  // If we do not have that id push it to the array
  if (!array.value.find((x) => x === id.value) && id.value) {
    array.value.push(id.value);
  }
  // Get the index of element
  const index = computed(() => array.value.findIndex((x) => x === id.value));

  // Make sure we remove the element from the array in case we unmount it
  onBeforeUnmount(() => {
    array.value = array.value.filter((x) => x !== id.value);
  });

  return { id, index };
}
