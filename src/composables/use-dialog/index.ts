import { ComputedRef, Ref, WritableComputedRef } from "vue";

export const dialogs = ref<Array<string>>([]);

export default function (id: ComputedRef<string>, open: WritableComputedRef<boolean> | Ref<boolean>) {

  function addToDialogs() {
    if (!dialogs.value.find((dialog) => dialog === id.value)) {
      const app = document.getElementById("app");

      if (app) {
        app.inert = true;
        app.ariaHidden = "true";
      }
      dialogs.value.push(id.value);
    }
  }

  function removeFromDialogs() {
    dialogs.value = dialogs.value.filter((dialog) => dialog !== id.value);
  }

  if (open.value) addToDialogs();

  watch(open, (newValue) => {
    if (newValue) addToDialogs();
    else removeFromDialogs();
  });

  const isLast = computed(() => dialogs.value[dialogs.value.length - 1] === id.value);

  return { dialogs, isLast };
}
