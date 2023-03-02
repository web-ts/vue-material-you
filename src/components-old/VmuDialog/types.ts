export interface DialogAction {
  name: string;
  handler: (e: PointerEvent | undefined) => void;
}
