import { VmuButton, VmuDialog } from "@/index";
import vModel from "@/utilities/v-model";

export default defineComponent({
  name: "Dialogs",
  setup() {
    const defaultDialog = ref(true);
    const iconDialog = ref(false);

    return () =>
      h("div", { style: "display: flex; margin: 4rem; gap: 1rem" }, [
        h(
          VmuButton,
          {
            onClick: () => {
              defaultDialog.value = true;
            }
          },
          "Default Dialog"
        ),
        h(
          VmuButton,
          {
            onClick: () => {
              iconDialog.value = true;
            }
          },
          "Icon Dialog"
        ),
        h(VmuDialog, {
          ...vModel(defaultDialog),
          title: "Default Dialog",
          description: "This is a default dialog.",
          actions: [{ name: "Cancel", handler: () => (defaultDialog.value = false) }]
        }),
        h(VmuDialog, {
          ...vModel(iconDialog),
          title: "Icon Dialog",
          icon: "mdi:alert",
          description: "This is an icon dialog with a very long description that does not make any sense and it's only here to test the dialog's responsiveness.",
          actions: [{ name: "Cancel", handler: () => (iconDialog.value = false) }]
        })
      ]);
  }
});
