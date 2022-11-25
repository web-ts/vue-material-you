import { expect, describe, it } from "vitest";
import isEmpty from ".";

describe("is-empty", () => {
  it("should return true for empty values", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });
  it("should return false for non-empty values", () => {
    expect(isEmpty("a")).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });
});
