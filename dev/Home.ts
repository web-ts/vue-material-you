import { VmuButton } from "@/index";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Playground",
  setup() {
    const router = useRouter();

    return () =>
      h(
        "div",
        {
          style:
            "display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; margin: 4rem;"
        },
        [
          h("h1",{class:"vmu-text-on-background vmu-text-display-large"}, "Vue Material You Playground"),
          h("h1",{class:"vmu-text-on-background"}, "Components:"),
          router
            .getRoutes()
            .map((route) => route.path !== "/" && h(VmuButton, { onClick: () => router.push(route) }, `${String(route.name)}`))
        ]
      );
  }
});
