const height = ref(window.innerHeight);
const width = ref(window.innerWidth);

function update() {
  height.value = window.innerHeight;
  width.value = window.innerWidth;
}

window.addEventListener("resize", update);

/**
 * Reactive window dimensions.
 */
export default function () {
  return {
    height,
    width
  };
}
