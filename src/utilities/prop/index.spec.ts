import { expect, describe, it } from "vitest";
import prop from ".";

describe("prop", () => {
  it("should create a vue prop", () => {
    expect(prop.generic()).toEqual({ type: undefined, default: undefined, required: undefined });
  });

  it("should create a vue prop with a default number", () => {
    expect(prop.generic(12)).toEqual({ type: undefined, default: 12, required: undefined });
  });

  it("should create a vue prop with a Boolean type", () => {
    expect(prop.boolean()).toEqual({ type: Boolean, default: undefined, required: undefined });
  });

  it("should create a required vue prop", () => {
    expect(prop.required("test")).toEqual({ type: undefined, default: "test", required: true });
  });
});
