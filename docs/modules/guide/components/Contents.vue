<script setup lang="ts">
import useWindowDimensions from "@/composables/use-window-dimensions";
import prop from "@/utilities/prop";
const props = defineProps({
  markdown: prop.required<HTMLElement>(),
  containerSize: prop.required<number>()
});

function getElements() {
  const elements = props.markdown.querySelectorAll("h2, h3, h4, h5");

  return Array.from(elements);
}

const elements = ref(getElements());

const observer = new MutationObserver(() => {
  elements.value = getElements();
});

onMounted(() => {
  observer.observe(props.markdown, {
    childList: true,
    subtree: true
  });
});

onBeforeMount(() => {
  observer.disconnect();
});

const { width } = useWindowDimensions();
</script>
<template>
  <div class="fixed top-20 right-0" :style="`width: ${(width - containerSize) / 2}px`">
    <div class="vmu-text-on-surface">
      <h2 class="font-bold mb-4">On this page</h2>
      <ul class="flex flex-col gap-2 whitespace-nowrap max-w-xs min-w-xs">
        <li v-for="item in elements" :key="item.id">
          <a :href="'#' + item.id" class="max-w-xs block overflow-hidden whitespace-nowrap overflow-ellipsis">
            {{ item.textContent }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
