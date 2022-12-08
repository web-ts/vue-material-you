import { RouteLocation } from "vue-router";

export interface NavItem {
  icon: string;
  label: string;
  action?: (e: PointerEvent) => void;
  to?: RouteLocation | string;
}
