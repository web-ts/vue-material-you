import { RouteRecordRaw } from "vue-router";

import Home from "../components/Home/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

export default routes;
