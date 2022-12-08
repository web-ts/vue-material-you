import { createVueMaterialYou, setMessages, VmuButton } from "@/index";
import App from "./App.vue";
import router from "./router";
import { Icon } from "@iconify/vue";
import "@/scss/style.scss";
import "./scss/style.scss";
import "virtual:windi.css";

const materialYou = createVueMaterialYou({
  color: "#42b883",
  icon: {
    component: Icon,
    key: "icon",
    defaults: { width: "18", height: "18" }
  }
});

setMessages({
  dialog: {
    actions: {
      anotherAction: "Another Action"
    }
  }
});

const app = createApp(App);

app.use(materialYou);
app.use(router);
app.component("VmuButton", VmuButton);
app.mount("#app");
