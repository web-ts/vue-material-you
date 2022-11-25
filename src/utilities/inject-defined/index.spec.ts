import { expect, it, describe } from "vitest";
import { InjectionKey } from "vue";
import injectDefined from ".";

describe("inject-defined", () => {
  it("should throw an error if the injected value is undefined", () => {
    const test: InjectionKey<string> = Symbol("test");

    try {
      injectDefined(test);
    } catch (error: any) {
      expect(error.message).toBe("Injection key Symbol(test) is not defined");
    }
  });
});
