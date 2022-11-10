import { describe, expect, it } from "vitest";
import randomString from ".";

describe("random-string", () => {
  it("generates a random string of the given length", () => {
    expect(randomString(40)).toHaveLength(40);
  });

  it("generates a random string of the default length", () => {
    expect(randomString()).toHaveLength(20);
  });

});
