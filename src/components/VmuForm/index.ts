import useForm from "@/composables/use-form";
import emit from "@/utilities/emit";
import prop from "@/utilities/prop";

export default defineComponent({
  name: "VmuForm",
  props: {
    id: prop.generic<string>()
  },
  emits: {
    valid: emit<Record<string, any>>(),
    invalid: emit<Record<string, any>>()
  },
  setup(props, { slots, emit }) {
    const { handleSubmit, id } = useForm(props, emit);

    return () => h("form", { id: id.value, onSubmit: handleSubmit }, slots.default?.());
  }
});
