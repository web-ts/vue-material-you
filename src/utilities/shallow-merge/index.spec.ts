import { describe, it, expect } from "vitest";

import shallowMerge from ".";

describe("shallowMerge", () => {
  it("should merge two objects", () => {
    const source = { a: 1, b: 2 };
    const target = { b: 3, c: 4 };

    expect(shallowMerge(source, target)).toEqual({ a: 1, b: 3, c: 4 });
  });

  it("should merge two objects with nested objects", () => {
    const source = { a: 1, b: { c: 2, e: 4 } };
    const target = { b: { c: 3 }, d: 4 };

    expect(shallowMerge(source, target)).toEqual({ a: 1, b: { c: 3, e: 4 }, d: 4 });
  });

  it("should merge two objects with deeply nested objects", () => {
    const source = { a: 1, b: { c: 2, e: 4, f: { g: 1, h: { r: 4 } } } };
    const target = { b: { c: 3, f: { a: 1 } }, d: 4 };

    expect(shallowMerge(source, target)).toEqual({ a: 1, b: { c: 3, e: 4, f: { a: 1, g: 1, h: { r: 4 } } }, d: 4 });
  });
});
