import { DefineComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../Home";

const components = import.meta.glob<{ default: DefineComponent<any, any, any, any> }>("../components/**/index.ts", {
  eager: true
});

const routes = Object.entries(components).map(([path, module]) => {
  const split = path.split("/");

  const name = split[split.length - 2];

  const component = module.default;

  return {
    path: `/${name.toLowerCase()}`,
    name,
    component
  };
});

routes.push({
    path: "/",
    name: "Home",
    component: Home
})

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
