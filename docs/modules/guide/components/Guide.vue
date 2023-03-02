<script setup lang="ts">
import { VmuIcon } from "@/index";
import { useRouter } from "vue-router";
import Contents from "./Contents.vue";
import Navigation from "./Navigation.vue";
import TopBar from "./TopBar.vue";

const markdown = ref<HTMLElement | null>(null);

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
    <div class="flex relative">
      <navigation class="flex-grow max-w-2xl" />
      <div class="flex-grow">
        <top-bar />
        <div ref="markdown" class="vmu-text-on-surface max-w-4xl mx-auto px-4">
          <div
            class="w-full mb-4 bg-warning-container text-on-warning-container p-4 rounded-lg font-semibold flex items-center"
          >
            <div>
              <VmuIcon icon="mdi:warning" class="mr-2" />
            </div>
            <div>
              <span class="font-bold"> VueMaterialYou</span> is not ready for production. Breaking changes can be
              introduced at any time without any warning until there is a stable release.
            </div>
          </div>
          <router-view />
        </div>
      </div>
      <contents v-if="markdown" :markdown="markdown" />
    </div>
  </div>
</template>
