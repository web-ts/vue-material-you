import { DefineComponent } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const sandboxes = import.meta.glob<{ default: DefineComponent }>("../sandboxes/*/Sandbox.vue", { eager: true });

console.log(sandboxes);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: defineComponent({
      name: "Home",
      setup() {
        return () => h("div", "Home");
      }
    })
  }
];

Object.entries(sandboxes).forEach(([path, values]) => {
  const name = path.split("/")[2];

  routes.push({
    path: `/${name}`,
    name,
    component: values.default
  });
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
