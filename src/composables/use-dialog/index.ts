import { getConfiguration } from "@/configuration";
import GenericError from "@/errors/GenericError";
import { ComputedRef, Ref, WritableComputedRef } from "vue";

export const dialogs = ref<Array<string>>([]);

export default function (id: ComputedRef<string>, open: WritableComputedRef<boolean> | Ref<boolean>) {
  const config = getConfiguration();

  function addToDialogs() {
    if (!dialogs.value.find((dialog) => dialog === id.value)) {
      const app = document.getElementById(config.mountedOn);

      if (!app) {
        throw new GenericError(`Could not find element with id "${config.mountedOn}"`);
      }

      app.inert = true;
      app.ariaHidden = "true";

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
