import { VmuButton } from "@/index";
import { DefineComponent } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";

const sandboxes = import.meta.glob<{ default: DefineComponent }>("./sandboxes/*/Sandbox.vue", { eager: true });

console.log(sandboxes);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/playground",
    name: "Playground",
    component: defineComponent({
      name: "Playground",
      setup() {
        const names: Array<string> = [];

        Object.entries(sandboxes).forEach(([path]) => {
          const name = path.split("/")[2];

          names.push(name);
        });

        const router = useRouter();

        return () =>
          h("div", { class: "flex flex-col gap-4 items-center" }, [
            h("h1", { class: "mt-4 vmu-text-title-large" }, "Vue Material You Playground"),
            h(
              "div",
              { class: "flex flex-col gap-4 items-center" },
              names.map((name) =>
                h(
                  VmuButton,
                  {
                    onClick: () => {
                      router.push(`/playground/${name}`);
                    }
                  },
                  name.toUpperCase()
                )
              )
            )
          ]);
      }
    })
  }
];

Object.entries(sandboxes).forEach(([path, values]) => {
  const name = path.split("/")[2];

  routes.push({
    path: `/playground/${name}`,
    name,
    component: values.default
  });
});

export default routes;
