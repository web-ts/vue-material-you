import GenericError from "@/errors/GenericError";
import shallowMerge from "@/utilities/shallow-merge";

/**
 * Message defaults
 */
const defaults: Record<string, any> = {};

// Load all default messages from the folder
Object.entries(import.meta.glob<{ default: Record<string, any> }>("./*.yaml", { eager: true })).forEach(
  ([path, module]) => {
    const matched = path.match(/\.\/(.+)\.yaml/);

    defaults[matched ? matched[1] : ""] = module.default;
  }
);

export const messages = ref<Record<string, any>>(defaults);

/**
 * Set new messages. This is used for localization.
 * @param userMessages The messages that you want to override the defaults with.
 * @example setMessages({ dialog: { actions: { cancel: "Custom cancel message" } } });
 */
export function setMessages(userMessages: Record<string, any>) {
  // TODO: Deep merge userMessages with the current messages
  messages.value = shallowMerge(messages.value, userMessages);
}

/**
 * Get a computed message from the messages object.
 * @param key The key of the message to get
 */
export function getMessage(key: string) {
  return computed(() => {
    const keys = key.split(".");

    let message = messages.value;

    for (const k of keys) {
      message = message[k];

      if (!message) {
        throw new GenericError(`Message '${key}' not found.`);
      }
    }

    if (typeof message !== "string") throw new GenericError(`Incomplete message key path for: ${key}`);

    return message as string;
  });
}
