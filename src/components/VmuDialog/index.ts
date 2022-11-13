import useModel from "@/composables/use-model";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import scss from "./index.module.scss";
import { StyleValue, Transition } from "vue";
import useId from "@/composables/use-id";
import useDialog from "../../composables/use-dialog";
import Scrim from "../Scrim";
import vModel from "@/utilities/v-model";
import DialogTitle from "./DialogTitle";
import DialogDescription from "./DialogDescription";
import DialogIcon from "./DialogIcon";
import { DialogAction } from "./types";
import DialogActions from "./DialogActions";

export default defineComponent({
  name: "VmDialog",
  inheritAttrs: false,
  props: {
    id: prop<string>(),
    zIndex: prop<number>(100),
    modelValue: prop<boolean>({ default: undefined, type: Boolean }),
    fullScreen: prop<boolean>({ default: true, type: Boolean }),
    style: prop<StyleValue>(),
    title: prop<string>(),
    description: prop<string>(),
    icon: prop<string>(),
    actions: prop<Array<DialogAction>>(() => [])
  },
  emits: {
    "update:modelValue": emit<boolean>()
  },
  setup(props, { emit, attrs, slots }) {
    const id = useId(props);
    const open = useModel(props, emit);

    // #region animation

    const scrimOpen = ref(false);
    const contentOpen = ref(false);

    watch(open, (newValue) => {
      if (newValue) scrimOpen.value = true;
      else contentOpen.value = false;
    });

    async function onScrimOpen() {
      contentOpen.value = true;
    }

    async function onBeforeLeave() {
      await nextTick();
      scrimOpen.value = false;
    }

    // #endregion

    const { isLast } = useDialog(id, open);

    return () =>
      h(
        Scrim,
        {
          ...attrs,
          ...vModel(scrimOpen),
          id: id.value,
          isLast: isLast.value,
          onOpen: onScrimOpen
        },
        // Content Transition
        h(
          Transition,
          {
            name: "vmu-dialog-content",
            onBeforeLeave
          },
          () =>
            // Content
            contentOpen.value &&
            h("div", { class: scss.contents }, [
              h(DialogIcon, { icon: props.icon }),
              h(DialogTitle, {
                dialogId: id.value,
                title: props.title,
                icon: props.icon
              }),
              h(DialogDescription, {
                dialogId: id.value,
                description: props.description
              }),
              slots.default && slots.default(),
              h(DialogActions, { actions: props.actions })
            ])
        )
      );
  }
});
