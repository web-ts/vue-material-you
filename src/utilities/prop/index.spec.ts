import { expect, describe, it } from "vitest";
import prop from ".";

describe("prop", () => {
  it("should create a vue prop", () => {
    expect(prop()).toEqual({ type: undefined, default: undefined, required: undefined });
  });

  it("should create a vue prop with a default number", () => {
    expect(prop(12)).toEqual({ type: undefined, default: 12, required: undefined });
  });

  it("should create a vue prop with a type", () => {
    expect(prop({ default: false, type: Boolean })).toEqual({ type: Boolean, default: false, required: undefined });
  });

  it("should create a required vue prop", () => {
    expect(prop("test", true)).toEqual({ type: undefined, default: "test", required: true });
  });
});
