import Scrim from ".";
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("scrim", () => {
  it("should emit the open event", async () => {
    mount(Scrim, { attachTo: document.body, props: { open: true } });
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
