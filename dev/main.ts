import { createVueMaterialYou } from "@/index";
import App from "./App";
import { Icon } from "@iconify/vue";
import "@/scss/style.scss";
import "./style.scss";


const materialYou = createVueMaterialYou({
  color: "#6750A4",
  icon: {
    component: Icon,
    key: "icon",
    defaults: { width: "18", height: "18" },
  },
});

const app = createApp(App);

app.use(materialYou);
app.mount("#app");
