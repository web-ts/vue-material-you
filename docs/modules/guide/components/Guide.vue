<script setup lang="ts">
import useWindowDimensions from "@/composables/use-window-dimensions";
import { useRouter } from "vue-router";
import Contents from "./Contents.vue";
import Navigation from "./Navigation.vue";
import TopBar from "./TopBar.vue";

const markdown = ref<HTMLElement | null>(null);

const size = ref(0);

function onResize() {
  if (markdown.value) {
    size.value = markdown.value.clientWidth;
  }
}

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const { width } = useWindowDimensions();

function addTableWrapper() {
  const tables = markdown.value?.querySelectorAll("table");

  tables?.forEach((table) => {
    const parent = table.parentNode;

    if (!(parent instanceof HTMLDivElement && parent.classList.contains("markdown-table-wrapper"))) {
      const newParent = document.createElement("div");

      newParent.classList.add("markdown-table-wrapper");
      parent?.insertBefore(newParent, table);
      newParent.appendChild(table);
    }
  });
}

const router = useRouter();

router.afterEach(() => {
  nextTick(() => {
    addTableWrapper();
  });
});

onMounted(() => {
  if (markdown.value) {
    addTableWrapper();
  }
});
</script>
<template>
  <div>
    <navigation :container-size="size" />
    <top-bar :container-size="size" />
    <div
      ref="markdown"
      class="mt-20 vmu-text-on-surface max-w-4xl"
      :class="[width > 1460 || width < 1100 ? 'mx-auto' : 'ml-[260px]', width > 1100 ? 'px-[88px]' : 'px-[16px]']"
    >
      <router-view />
    </div>
    <contents v-if="markdown && width > 1550" :container-size="size" :markdown="markdown" />
  </div>
</template>
