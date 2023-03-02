<script setup lang="ts">
import { VmuSheet } from "@/index";
</script>

<template>
  <div class="flex items-center justify-center pt-10 flex-col gap-4">
    <VmuSheet class="vmu-ripple-primary p-4 border border-primary text-primary" tag="button">Test</VmuSheet>
    <VmuSheet class="vmu-ripple-secondary p-4 border border-secondary text-secondary" tag="button">Test</VmuSheet>
    <VmuSheet class="vmu-ripple-warning p-4 border border-warning text-warning" tag="button">Test</VmuSheet>
    <VmuSheet class="vmu-ripple-success p-4 border border-success text-success" tag="button">Test</VmuSheet>
    <VmuSheet class="vmu-ripple-info p-4 border border-info text-info" tag="button">Test</VmuSheet>
    <VmuSheet class="vmu-ripple-error p-4 border border-error text-error w-[200px] h-[200px]" tag="button">
      Test BIG
    </VmuSheet>
  </div>
</template>
