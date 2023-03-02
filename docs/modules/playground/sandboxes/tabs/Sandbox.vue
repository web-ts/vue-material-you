<script setup lang="ts">
import { VmuTab, VmuTabs } from "@/index";

const currentTab = ref(0);
const currentTab2 = ref(0);
</script>

<template>
  <div class="flex pt-10 flex-col gap-4 items-center justify-center">
    <VmuTabs
      v-model="currentTab"
      :switches="[{ label: 'Output' }, { label: 'Code' }, { label: 'Very long tab label aa bb' }]"
    >
      <VmuTab> Tab 1 </VmuTab>
      <VmuTab> Tab 2 </VmuTab>
      <VmuTab> Tab 3</VmuTab>
    </VmuTabs>

    <div class="max-w-lg">
      <VmuTabs v-model="currentTab2">
        <VmuTab v-for="x in 10" :key="x"> Tab {{ x }} </VmuTab>
      </VmuTabs>
    </div>
  </div>
</template>
