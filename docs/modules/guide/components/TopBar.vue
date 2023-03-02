<script setup lang="ts">
import { VmuButton, VmuIcon } from "@/index";

const searching = ref(false);
// const searchQuery = ref("");

function clickOnInput() {
  (document.getElementById("color-changer") as HTMLInputElement).click();
}
</script>
<template>
  <div class="flex p-6 justify-between items-center sticky top-0 backdrop-filter backdrop-blur-md z-10 w-full">
    <div>
      <vmu-button type="elevated" size="small" icon="mdi:search" @click="searching = true">Search</vmu-button>
    </div>
    <div class="flex gap-4">
      <button class="w-6 h-6 relative overflow-hidden rounded-full" aria-label="change color" @click="clickOnInput">
        <!-- <div :style="{ backgroundColor: color }" class="w-full h-full absolute z-10 top-0 left-0"></div>
        <input
          id="color-changer"
          v-model="color"
          aria-label="change color"
          type="color"
          name="color"
          class="appearance-none border-none absolute top-1/2 left-1/2"
        /> -->
      </button>
    </div>
  </div>
  <!-- <vmu-dialog
    v-model="searching"
    title="Document Search"
    description="Search across the VMU docs"
    class="flex flex-col gap-4"
    show-close-action
  >
    <vmu-input v-model="searchQuery" leading-icon="line-md:search" label="Search docs" />
  </vmu-dialog> -->
</template>
