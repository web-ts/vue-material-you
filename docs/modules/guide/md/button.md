# VmuButton

This is a simple button with a few interesting features.

MD3 Link: [https://m3.material.io/components/buttons/overview](https://m3.material.io/components/buttons/overview)

## Usage

```vue
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

<vmu-button> Filled </vmu-button>
<vmu-button type="outlined"> Outlined </vmu-button>
<vmu-button type="text"> Text </vmu-button>
<vmu-button type="elevated"> Elevated </vmu-button>
<vmu-button type="tonal"> Tonal </vmu-button>

Disabled

<vmu-button disabled> Filled </vmu-button>
<vmu-button disabled type="outlined"> Outlined </vmu-button>
<vmu-button disabled type="text"> Text </vmu-button>
<vmu-button disabled type="elevated"> Elevated </vmu-button>
<vmu-button disabled type="tonal"> Tonal </vmu-button>

With Icons

<vmu-button icon="mdi:plus"> Filled </vmu-button>
<vmu-button icon="mdi:plus" type="outlined"> Outlined </vmu-button>
<vmu-button icon="mdi:plus" type="text"> Text </vmu-button>
<vmu-button icon="mdi:plus" type="elevated"> Elevated </vmu-button>
<vmu-button icon="mdi:plus" type="tonal"> Tonal </vmu-button>
