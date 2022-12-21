<script setup lang="ts">
import { VmuButton, VmuCard } from "@/index";
import logo from "@docs/assets/logo.svg?raw";
import { useRouter } from "vue-router";
const router = useRouter();

const cards = [
  {
    title: "⚡️Fast and rich in features",
    description:
      "Vue Material You allows you to quickly create your most common components without worrying about anything."
  },
  {
    title: "♿️ Built with accessibility in mind",
    description: "Accessible by default. All the components from this library are created with accessibility in mind."
  },
  {
    title: "✨ Open source and free",
    description: "This library is open source and you can contribute to it on GitHub."
  }
];
</script>
<template>
  <div class="min-h-screen flex flex-col mx-4">
    <div class="flex justify-center">
      <div class="max-w-50" v-html="logo" />
    </div>
    <h1 class="vmu-text-headline-large vmu-text-on-surface text-center mb-2">Vue Material You</h1>
    <h2 class="vmu-text-body-medium vmu-text-on-surface text-center">Powerful and easy to use framework for Vue.js</h2>
    <div class="flex justify-center mt-8 gap-4 flex-wrap">
      <vmu-button @click="router.push('/guide/get-started')">Get Started</vmu-button>
      <vmu-button type="text" href="https://github.com/web-ts/vue-material-you" target="_blank">
        View on Github
      </vmu-button>
    </div>
    <div class="flex gap-4 mt-8 justify-center flex-wrap" role="list">
      <vmu-card v-for="card in cards" :key="card.title" role="listitem" type="filled" class="max-w-sm">
        <h1 class="vmu-text-body-large">{{ card.title }}</h1>
        <p class="vmu-text-body-medium vmu-text-on-surface-variant mt-8">
          {{ card.description }}
        </p>
      </vmu-card>
    </div>
    <footer class="vmu-text-on-surface-variant flex flex-col justify-center text-center items-center flex-grow">
      <div class="vmu-text-body-small">Released under the MIT License.</div>
      <div class="vmu-text-body-small">
        Made with ❤️ by <a class="vmu-text-primary" href="https://github.com/web-ts" target="_blank">WEB-TS</a>
      </div>
    </footer>
  </div>
</template>
