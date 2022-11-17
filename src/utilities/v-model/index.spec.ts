import { describe, expect, it } from "vitest";
import vModel from ".";

describe("v-model", () => {
  it("expands into the right object with a ref", () => {
    const model = ref("test");
    const result = vModel(model);

    expect(result.modelValue).toEqual("test");
  });

  it("updates the ref to the new value", () => {
    const model = ref("test");
    const result = vModel(model);

    result["onUpdate:modelValue"]("new-value");

    expect(model.value).toEqual("new-value");
  });
});
