import { DefineComponent } from "vue";

export interface VMConfiguration {
  mountedOn: HTMLElement | null;
  icon?: {
    component: DefineComponent<any, any, any, any>;
    defaults?: Record<string, any>;
    key: string;
  };
}
