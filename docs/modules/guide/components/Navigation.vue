<script setup lang="ts">
import logo from "@docs/assets/logo.svg?raw";

const items: Array<{ label: string; icon?: string; content: Array<{ label: string; to: string }> }> = [
  {
    label: "Introduction",
    content: [
      {
        label: "What is Vue Material You?",
        to: "/guide/intro"
      },
      {
        label: "Get Started",
        to: "/guide/get-started"
      },
      {
        label: "Configuration",
        to: "/guide/configuration"
      }
    ]
  },
  {
    label: "Components",
    content: [
      {
        label: "VmuButton",
        to: "/guide/components/button"
      },
      {
        label: "VmuInput",
        to: "/guide/components/inputs"
      }
    ]
  },
  {
    label: "Api",
    content: [
      {
        label: "Color System",
        to: "/guide/api/color"
      },
      {
        label: "Dark Mode",
        to: "/guide/api/dark-mode"
      }
    ]
  }
];
</script>
<template>
  <div
    class="min-w-[260px] sticky vmu-bg-surface-variant top-0 left-0 h-screen vmu-elevation-2 vmu-text-on-surface-variant z-20 flex flex-col items-end pr-8"
  >
    <router-link
      to="/"
      class="max-w-[200px] w-full mb-4 mt-4 vmu-text-title-medium font-bold flex items-center justify-center gap-2 bg-surface text-on-surface p-2 rounded-full"
    >
      <div class="max-w-[28px]" v-html="logo"></div>
      <span> Vue Material You</span>
    </router-link>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mb-4 border-t max-w-[200px] w-full flex flex-col pt-4 border-opacity-40 border-on-surface-variant"
    >
      <h2 class="flex items-center vmu-text-title-medium font-bold mb-2 text-on-surface">
        <div>{{ item.label }}</div>
      </h2>
      <ul>
        <li v-for="(content, j) in item.content" :key="j" class="mb-1 vmu-text-title-small font-bold">
          <router-link :to="content.to">{{ content.label }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
.router-link-active {
  color: rgb(var(--vmu-color-primary));
}
</style>
