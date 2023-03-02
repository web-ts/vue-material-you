<script setup lang="ts">
// import { VmuInput } from "@/index";

const input = ref("test");
const rules = ref<string | null>(null);
const testNumber = ref(0);
const testPassword = ref("test");

const select = ref();
const items: any = [
  {
    label: "Item 1",
    value: "item1"
  },
  {
    label: "Item 2",
    value: "item2"
  },
  {
    label: "Item 3",
    value: "item3"
  },
  {
    label: "Item 4",
    value: "item4"
  },
  {
    label: "Item 5",
    value: "item5"
  },
  {
    label: "Item 6",
    value: "item6"
  },
  {
    label: "Item7dsfsdfsdfsdasddddddddddddddddddfsdfdfsdfsdf ",
    value: "item7"
  },
  {
    label: "Item 8",
    value: "item8"
  },
  {
    label: "Item 9",
    value: "item9"
  }
];
</script>
<template>
  <div class="flex justify-center flex-col items-center h-screen gap-4">
    <VmuInput v-model="input" label="Test string" />
    <VmuInput v-model="rules" label="Test Rules" :rules="(v) => (v ? true : 'Value is required')" />
    <VmuInput
      v-model="rules"
      label="Test Rules"
      :rules="(v) => (v ? true : 'Value is required')"
      leading-icon="mdi:home"
    />

    <VmuInput v-model="testNumber" label="Test number" type="number" />
    <VmuInput v-model="testPassword" label="Test number" type="email" />

    <VmuInput v-model="select" label="Select test" :options="items" />

    <div class="vmu-text-on-background mt-12">
      {{ input }} {{ rules }} {{ testNumber }} {{ typeof testNumber }} {{ testPassword }}
    </div>
  </div>
</template>
