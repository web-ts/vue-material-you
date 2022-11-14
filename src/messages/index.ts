import GenericError from "@/errors/GenericError";

const defaults: Record<string, any> = {};

Object.entries(import.meta.glob<{ default: Record<string, any> }>("./*.yaml", { eager: true })).forEach(
  ([path, module]) => {
    const matched = path.match(/\.\/(.+)\.yaml/);

    defaults[matched ? matched[1] : ""] = module.default;
  }
);

export const messages = ref<Record<string, any>>(defaults);

export function setMessages(userMessages: Record<string, any>) {
  messages.value = { ...messages.value, ...userMessages };
}

/**
 * Get a computed message from the messages object.
 * @param key The key of the message to get
 */
export function getMessage(key: string) {
  return computed(() => {
    const keys = key.split(".");

    let message = messages.value;

    for (const key of keys) {
      message = message[key];

      if (!message) {
        throw new GenericError(`Message '${key}' not found.`);
      }
    }

    return message as unknown as string;
  });
}
