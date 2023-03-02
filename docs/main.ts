import App from "./App.vue";
import { createVueMaterialYou, VmuButton } from "@/index";
import { ViteSSG } from "vite-ssg";
import { routes } from "./router";
import { Icon } from "@iconify/vue";
import "./scss/style.scss";
import "virtual:windi.css";
import "@/scss/style.scss";
import Viewer from "./modules/viewer/components/Viewer.vue";


const materialYou = createVueMaterialYou({
  color: "#42b883",
  icon: {
    component: Icon,
    key: "icon",
    defaults: { width: "18", height: "18" }
  }
});


export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(materialYou);
  app.component("Viewer", Viewer);
  app.component("VmuButton", VmuButton);
});
