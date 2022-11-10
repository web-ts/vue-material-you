import { expect, describe, it } from "vitest";

import useId from ".";

describe("use-id", () => {
  it("should auto generate an id", async () => {
    const id = useId({ id: null });

    expect(id.value).toContain("identity_");
  });

  it("should have the provided id", async () => {
    const id = useId({ id: "provided" });

    expect(id.value).toMatch("provided");
  });
});
