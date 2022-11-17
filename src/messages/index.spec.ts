import GenericError from "@/errors/GenericError";
import { describe, expect, it } from "vitest";
import { getMessage, messages, setMessages } from ".";

describe("messages", () => {
  it("should have defaults", () => {
    expect(messages.value).toMatchSnapshot();
  });

  it("should merge messages", () => {
    setMessages({ dialog: { testMessage: "Test Message" } });
    expect(messages.value).toMatchSnapshot();
  });

  it("should get a message", () => {
    expect(getMessage("dialog.testMessage").value).toEqual("Test Message");
  });

  it("should throw an error if key is not found", () => {
    let error: unknown;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const message = getMessage("dialog.nonExistent").value;
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(GenericError);
  });
});
