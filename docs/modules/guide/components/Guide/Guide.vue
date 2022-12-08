<script setup lang="ts">
import { NavItem } from "@/components/VmuNavRail/types";
import { VmuNavRail } from "@/index";

const railItems: Array<NavItem> = [
  {
    label: "Intro",
    icon: "line-md:clipboard-list",
    to: "/guide/intro"
  },
  {
    label: "Get Started",
    icon: "line-md:grid-3-filled",
    to: "/guide/get-started"
  },
  {
    label: "Material Components",
    icon: "line-md:plus-circle",
    to: "/guide/material-components"
  },
  {
    label: "Api",
    icon: "line-md:cloud-tags-loop",
  },
  {
    label: "About",
    icon: "line-md:question",

  }
];
</script>
<template>
  <div>
    <vmu-nav-rail :items="railItems" />
    <div class="ml-[88px] mt-8 vmu-text-on-surface">
      <router-view />
    </div>
  </div>
</template>
