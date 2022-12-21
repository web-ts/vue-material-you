import router from "./router";
import { Icon } from "@iconify/vue";
import { RouterView } from "vue-router";
import { createVueMaterialYou } from "@/index";

import "virtual:windi.css";
import "@/scss/style.scss";

const materialYou = createVueMaterialYou({
  color: "#42b883",
  icon: {
    component: Icon,
    key: "icon",
    defaults: { width: "18", height: "18" }
  }
});
const app = createApp(defineComponent(() => () => h(RouterView)));

app.use(materialYou);
app.use(router);
app.mount("#app");
