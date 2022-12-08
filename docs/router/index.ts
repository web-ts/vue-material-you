import getChildRoutes from "@docs/utils/get-child-routes";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = getChildRoutes(import.meta.glob("../modules/*/routes/index.ts", { eager: true }));

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
