import { VmuButton, VmuForm, VmuInput } from "@/index";
import vModel from "@/utilities/v-model";

export default defineComponent({
  name: "FormAndInputs",
  setup() {
    const model = ref<string | undefined>();

    const required = (value: string | undefined) => {
      if (value === null || value === undefined || value === "") {
        return "This field is required.";
      }

      return true;
    };

    function min(minNumber: number) {
      return (value: string | undefined) => {
        if (value === null || value === undefined || value === "") {
          return true;
        }

        if (value.length < minNumber) {
          return `This field must be at least ${minNumber} characters long.`;
        }

        return true;
      };
    }

    function valid(data: any) {
      console.log("valid", data);
    }

    function invalid(data: any) {
      console.log("invalid", data);
    }

    return () =>
      h("div", {}, [
        h(
          VmuForm,
          {
            style: "display: flex; flex-direction:column; gap:1rem; padding: 4rem",
            onValid: valid,
            onInvalid: invalid
          },
          () => [
            h(VmuInput, {
              ...vModel(model),
              rules: required,
              label: "Model 1",
              supportingText: "Supporting text",
              max: 40
            }),
            h(VmuInput, { ...vModel(model), type:"password", rules: required, label: "Model 1", leadingIcon: "mdi-search" }),
            h(VmuInput, { ...vModel(model), rules: required, label: "Model 1", max: 40 }),
            h(VmuInput, {
              ...vModel(model),
              rules: [required, min(5)],
              label: "Model 1",
              leadingIcon: "mdi-search",
              trailingIcon: "mdi-close"
            }),
            h(VmuInput, { ...vModel(model) }),
            h("div", {}, h(VmuButton, { submit: true }, "Submit"))
          ]
        )
      ]);
  }
});
