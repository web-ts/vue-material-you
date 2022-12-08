# Getting Started

This section will help you configure the VueMaterialYou framework.

VueMaterialYou is not ready for production. Breaking changes can be introduced at any time without any warning until there is a stable release.

## Install

Install `vue-material-you` with your favorite package manager:

```sh
pnpm install vue-material-you
# or
npm install vue-material-you
# or
yarn add vue-material-you
```

In your `main.ts` file:

```ts
...
import { createVueMaterialYou } from "vue-material-you";
import { Icon } from "@iconify/vue"; // OR your own Icon component
import "vue-material-you/style.css";

// Minimal config to get started
const materialYou = createVueMaterialYou({
  color: "#6750A4", // Provide your own color, the rest will be auto generated
  icon: {
    component: Icon,
    key: "icon",
  }
});

createApp(App).use(materialYou).mount("#app");
```

In your components:

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
