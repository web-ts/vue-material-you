import prop from "@/utilities/prop";
import { RouteLocation, useRoute, useRouter } from "vue-router";
import scss from "./index.module.scss";
import NavRailItem from "./NavRailItem";
import { NavItem } from "./types";

export default defineComponent({
  name: "VmuNavRail",
  props: {
    items: prop.generic<Array<NavItem>>([])
  },
  setup(props) {
    const classList = computed(() => ({
      [scss.rail]: true
    }));

    const selected = ref<null | number | RouteLocation>(null);

    const route = useRoute();
    const router = useRouter();

    function isSelected(item: NavItem, index: number) {
      if (item.to) {
        const resolved = router.resolve(item.to).name;

        return route.name === resolved || route.matched.some((m) => m.name === resolved);
      }
      if (!selected.value) return false;

      if (typeof selected.value === "number") {
        return selected.value === index;
      }
    }

    function onSelect(item: NavItem, index: number) {
      if (item.to) {
        selected.value = router.resolve(item.to);
        router.push(item.to);
      }
      selected.value = index;
    }

    return () =>
      h(
        "div",
        { class: classList.value },
        h(
          "nav",
          {},
          props.items.map((item, index) =>
            h(NavRailItem, {
              item,
              index,
              onSelect: () => onSelect(item, index),
              selected: isSelected(item, index)
            })
          )
        )
      );
  }
});
