# VmuButton

This is a simple button with a few interesting features.

MD3 Link: [https://m3.material.io/components/buttons/overview](https://m3.material.io/components/buttons/overview)

## Usage

```html
<script setup lang="ts">
  import { ref } from "vue";
  import { VmuButton } from "vue-material-you";

  const counter = ref(0);
</script>

<template>
  <div>My extraordinary component</div>
  <div>The count is {{ counter }}</div>
  <div>
    <vmu-button @click="counter++">Increase IT</vmu-button>
  </div>
</template>
```

## Examples

Default

<div class="flex gap-4">
  <vmu-button> Filled </vmu-button>
  <vmu-button type="outlined"> Outlined </vmu-button>
  <vmu-button type="text"> Text </vmu-button>
  <vmu-button type="elevated"> Elevated </vmu-button>
  <vmu-button type="tonal"> Tonal </vmu-button>
</div>

Disabled

<div class="flex gap-4">
  <vmu-button disabled> Filled </vmu-button>
  <vmu-button disabled type="outlined"> Outlined </vmu-button>
  <vmu-button disabled type="text"> Text </vmu-button>
  <vmu-button disabled type="elevated"> Elevated </vmu-button>
  <vmu-button disabled type="tonal"> Tonal </vmu-button>
</div>

With Icons

<div class="flex gap-4">
  <vmu-button icon="mdi:plus"> Filled </vmu-button>
  <vmu-button icon="mdi:search" type="outlined"> Outlined </vmu-button>
  <vmu-button icon="mdi:home" type="text"> Text </vmu-button>
  <vmu-button icon="mdi:arrow-right" type="elevated"> Elevated </vmu-button>
  <vmu-button icon="mdi:book" type="tonal"> Tonal </vmu-button>
</div>
