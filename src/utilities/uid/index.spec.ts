import { describe, expect, it } from "vitest";
import uid from ".";

describe("uid", () => {
  it("generates a random id of the given length", () => {
    expect(uid(40)).toHaveLength(40);
  });

  it("generates a random id of the default length", () => {
    expect(uid()).toHaveLength(20);
  });

  it("should work with a length of 0", () => {
    // Min length is 5
    expect(uid(0)).toHaveLength(5);
  });
});
