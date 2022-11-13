import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    return () => h(RouterView);
  }
});
