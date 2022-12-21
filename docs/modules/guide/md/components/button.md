# VmuButton

This is a simple button with a few interesting features.

[MD3 Link](https://m3.material.io/components/buttons/overview)

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

<viewer component="button-default" prop="type" values="'filled' | 'outlined' | 'text' | 'elevated' | 'tonal'" default-value="'filled'" />

<viewer component="button-disabled" prop="disabled" values="boolean" default-value="false" />
<viewer component="button-loading" prop="loading" values="boolean" default-value="false" />

<viewer component="button-size" prop="size" values="'large' | 'medium' | 'small'" default-value="'large'" />

<viewer component="button-icons" prop="icon" values="string | undefined" default-value="undefined" />

## Props Interface

```ts
withDefaults(
  defineProps<{
    type?: "filled" | "outlined" | "text" | "elevated" | "tonal";
    icon?: string | null;
    submit?: boolean;
    reset?: boolean;
    disabled?: boolean;
    href?: string;
    size?: "large" | "medium" | "small";
  }>(),
  {
    type: "filled",
    icon: null,
    size: "large"
  }
);
```
