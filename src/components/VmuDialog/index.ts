import useModel from "@/composables/use-model";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";
import { StyleValue } from "vue";
import useId from "@/composables/use-id";
import useDialog from "../../composables/use-dialog";
import Scrim from "../Scrim";
import DialogTitle from "./DialogTitle";
import DialogDescription from "./DialogDescription";
import DialogIcon from "./DialogIcon";
import { DialogAction } from "./types";
import DialogActions from "./DialogActions";
import DialogContent from "./DialogContent";
import { getMessage } from "@/messages";
import DialogFullscreenContent from "./DialogFullscreenContent";
import DialogFullscreenHeader from "./DialogFullscreenHeader";

export default /* @__PURE__ */ defineComponent({
  name: "VmDialog",
  inheritAttrs: false,
  props: {
    id: prop.generic<string>(),
    zIndex: prop.generic(100),
    modelValue: prop.boolean(false),
    fullscreen: prop.boolean(false),
    style: prop.generic<StyleValue>(),
    title: prop.generic<string>(),
    description: prop.generic<string>(),
    icon: prop.generic<string>(),
    showCloseAction: prop.boolean(false),
    actions: prop.generic<Array<DialogAction>>([])
  },
  emits: {
    "update:modelValue": emit<boolean>()
  },
  setup(props, { emit, attrs, slots }) {
    const id = useId(props);
    const open = useModel(props, emit);
    const { isLast } = useDialog(id, open);

    // #region animation

    const scrimOpen = ref(false);
    const contentOpen = ref(false);

    // Check if it's open by default
    if (open.value) {
      scrimOpen.value = true;
      contentOpen.value = true;
    }
    watch(open, (newValue) => {
      if (newValue) scrimOpen.value = true;
      else contentOpen.value = false;
    });

    async function onScrimOpen() {
      contentOpen.value = true;
    }

    async function onContentClose() {
      await nextTick();
      scrimOpen.value = false;
    }

    // #endregion

    const actions = computed(() => {
      if (!props.showCloseAction) return props.actions;

      const defaultCloseAction = {
        name: getMessage("dialog.actions.cancel").value,
        handler: () => (open.value = false)
      };

      return [...props.actions, defaultCloseAction];
    });

    return () =>
      h(
        Scrim,
        {
          ...attrs,
          open: scrimOpen.value,
          id: id.value,
          isLast: isLast.value,
          onOpen: onScrimOpen
        },
        // Content Transition
        () =>
          (!props.fullscreen
            ? h(DialogContent, { isOpen: contentOpen.value, onClose: onContentClose }, () => [
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
                h(DialogActions, {
                  actions: actions.value
                })
              ])
            : h(DialogFullscreenContent, { isOpen: contentOpen.value, onClose: onContentClose }, () => [
                h(DialogFullscreenHeader, {
                  dialogId: id.value,
                  title: props.title,
                  actions: actions.value,
                  onClose: () => (open.value = false)
                }),
                slots.default && slots.default()
              ]))
      );
  }
});
