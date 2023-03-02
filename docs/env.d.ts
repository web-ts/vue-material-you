declare module "*.md" {
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}

declare module "*.vue" {
  // eslint-disable-next-line no-duplicate-imports
  import type { ComponentOptions } from "vue";
  const Component: ComponentOptions;
  export default Component;
}
