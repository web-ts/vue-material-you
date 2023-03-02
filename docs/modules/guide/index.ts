import { ComponentOptions } from "vue";
import { RouteRecordRaw } from "vue-router";
import Guide from "./components/Guide.vue";

const modules = import.meta.glob<{ attributes: Record<string, string>; default: ComponentOptions }>("./md/**/*.md");

const children: Array<RouteRecordRaw> = [];

Object.entries(modules).forEach(([path, module]) => {
  const mPath = path.replace("./md/", "").replace(".md", "");

  children.push({
    name: mPath.split("/").join("-"),
    path: mPath,
    component: async () => (await module()).default
  });
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/guide",
    name: "Guide",
    component: Guide,
    children
  }
];

console.log(routes);

export default routes;
