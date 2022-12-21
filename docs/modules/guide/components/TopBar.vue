<script setup lang="ts">
import useWindowDimensions from "@/composables/use-window-dimensions";
import { useColor, VmuButton, VmuDialog, VmuIcon, VmuInput } from "@/index";
import prop from "@/utilities/prop";

defineProps({
  containerSize: prop.required<number>()
});

const { width } = useWindowDimensions();

const searching = ref(false);
const searchQuery = ref("");

const color = useColor();

function clickOnInput() {
  (document.getElementById("color-changer") as HTMLInputElement).click();
}
</script>
<template>
  <div
    class="flex p-6 justify-between items-center fixed top-0 backdrop-filter backdrop-blur-md z-10"
    :style="{
      'margin-left': width > 1100 ? `${Math.max((width - containerSize) / 2, 260)}px` : '',
      'max-width': width > 1550 ? `${containerSize + 320}px` : width > 1100 ? `${containerSize}px` : '',
      width: '100%'
    }"
  >
    <vmu-button type="elevated" size="small" icon="mdi:search" @click="searching = true">Search</vmu-button>
    <div class="flex gap-4">
      <button class="w-6 h-6 relative overflow-hidden rounded-full" aria-label="change color" @click="clickOnInput">
        <div :style="{ backgroundColor: color }" class="w-full h-full absolute z-10 top-0 left-0"></div>
        <input
          id="color-changer"
          v-model="color"
          aria-label="change color"
          type="color"
          name="color"
          class="appearance-none border-none absolute top-1/2 left-1/2"
        />
      </button>
      <a class="cursor-pointer text-primary" href="https://github.com/web-ts/vue-material-you" target="_blank">
        <vmu-icon icon="foundation:social-github" width="24px" height="24px" />
      </a>
    </div>
  </div>
  <vmu-dialog
    v-model="searching"
    title="Document Search"
    description="Search across the VMU docs"
    class="flex flex-col gap-4"
    show-close-action
  >
    <vmu-input v-model="searchQuery" leading-icon="line-md:search" label="Search docs" />
  </vmu-dialog>
</template>
