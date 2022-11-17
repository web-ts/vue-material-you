import { describe, it, expect } from "vitest";
import sleep from ".";

describe("sleep", () => {
  it("should sleep", async () => {
    const start = Date.now();

    await sleep(20);
    const end = Date.now();

    expect(end - start).toBeGreaterThan(10);
  });
});
