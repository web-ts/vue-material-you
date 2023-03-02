<script setup lang="ts">
import { VmuScrim } from "@/index";
const open = ref(true);

function onOpen() {
  console.log("open");
}
</script>

<template>
  {{ open }}
  <VmuScrim v-model="open" closable @open="onOpen" />
</template>
