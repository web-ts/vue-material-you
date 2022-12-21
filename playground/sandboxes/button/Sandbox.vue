<script setup lang="ts">
import Sheet from "@/components/Sheet";
import { VmuButton } from "@/index";
</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <sheet class="min-w-[20rem] min-h-[20rem] border border-primary vmu-ripple-primary"></sheet>
    <sheet class="min-w-[40rem] min-h-[20rem] border border-primary vmu-ripple-primary"></sheet>
    <sheet class="min-w-[6rem] min-h-[6rem] border border-primary vmu-ripple-primary"></sheet>
    <sheet disable-ripple class="min-w-[12rem] min-h-[3rem] border border-primary vmu-ripple-primary"></sheet>
    <VmuButton >test</VmuButton>
  </div>
</template>
