import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Scrim from ".";

describe("scrim", () => {
  it("should emit the open event", async () => {
    mount(Scrim, { attachTo: document.body, props: { open: true } });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
