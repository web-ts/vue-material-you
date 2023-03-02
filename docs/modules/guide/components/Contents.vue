<script setup lang="ts">
import prop from "vue-typed-props";
import { VmuIcon } from "@/index";
const props = defineProps({
  markdown: prop.required.object<HTMLElement>()
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
</script>
<template>
  <div class="sticky top-0 left-0 h-screen vmu-text-on-surface-variant z-20 flex flex-col items-end pr-8">
    <a class="cursor-pointer text-primary" href="https://github.com/web-ts/vue-material-you" target="_blank">
      <vmu-icon icon="foundation:social-github" width="24px" height="24px" />
    </a>
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
