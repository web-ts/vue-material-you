import { RenderFunction } from "vue";

export default function (render: RenderFunction): void {
  const vm = getCurrentInstance();

  if (!vm) throw new Error("useRender must be called within a component setup function.");

  (vm as any).render = render;
}
