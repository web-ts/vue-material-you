<script setup lang="ts">
import { VmuTab, VmuTabs, VmuCard } from "@/index";
import { DefineComponent } from "vue";
import { highlight, languages } from "prismjs";
defineProps<{
  component: string;
  prop: string;
  values: string;
  defaultValue: string;
}>();

const raw = import.meta.glob<string>("../viewers/**/*.vue", { eager: true, as: "raw" });
const components = import.meta.glob<{ default: DefineComponent }>("../viewers/**/*.vue", { eager: true });
const pair: Record<string, { raw: string; component: DefineComponent }> = {};

Object.keys(raw).forEach((key) => {
  const name = [...key.split("/")].pop()?.split(".")[0] ?? "";

  pair[name] = {
    raw: raw[key],
    component: components[key].default
  };
});
const currentTab = ref(0);
</script>
<template>
  <vmu-card  v-if="pair[component]" class="my-4" type="outlined">
    <div class="mb-4 flex flex-col gap-1 vmu-text-label-large">
      <div>
        Prop: <code>{{ prop }}</code>
      </div>
      <div>
        Values: <code>{{ values }} </code>
      </div>
      <div>
        Default: <code>{{ defaultValue }}</code>
      </div>
    </div>
    <vmu-tabs
      v-model="currentTab"
      :tabs="[
        { label: 'Output', icon: 'mdi:search' },
        { label: 'Code', icon: 'mdi:code' }
      ]"
    >
      <vmu-tab>
        <div class="py-4 pt-8">
          <component :is="pair[component].component" />
        </div>
      </vmu-tab>
      <vmu-tab>
        <pre style="background-color: rgb(12, 12, 12)">
            <code class="language-html" v-html="highlight(pair[component].raw.trim(), languages.html, 'html')"></code>
          </pre>
      </vmu-tab>
    </vmu-tabs>
  </vmu-card>
</template>
