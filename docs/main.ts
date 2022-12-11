import { createVueMaterialYou, setMessages, VmuButton, VmuForm, VmuInput, VmuListItem } from "@/index";
import App from "./App.vue";
import router from "./router";
import { Icon } from "@iconify/vue";
import "./scss/style.scss";
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
app.component("VmuInput", VmuInput);
app.component("VmuForm", VmuForm);
app.component("VmuListItem", VmuListItem);
app.mount("#app");
