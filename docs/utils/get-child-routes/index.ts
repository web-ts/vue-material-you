import { RouteRecordRaw } from "vue-router";

export default function (imported: Record<string, { default: Array<RouteRecordRaw> }>) {
  const routes: Array<RouteRecordRaw> = [];

  Object.values(imported).forEach((route) => {
    routes.push(...route.default);
  });

  return routes;
}
