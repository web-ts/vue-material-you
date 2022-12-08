import { getConfiguration } from "@/configuration";

import { ComputedRef, Ref, WritableComputedRef } from "vue";

export const dialogs = ref<Array<string>>([]);

export default function (id: ComputedRef<string>, open: WritableComputedRef<boolean> | Ref<boolean>) {
  const config = getConfiguration();

  function addToDialogs() {
    if (!dialogs.value.find((dialog) => dialog === id.value)) {
      dialogs.value.push(id.value);
      const app = config.mountedOn;

      if (!app) return;

      app.inert = true;
      app.ariaHidden = "true";
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
