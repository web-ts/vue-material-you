import { DefineComponent } from "vue";

export interface VMConfiguration {
  mountedOn: string;
  icon?: {
    component: DefineComponent<any, any, any, any>;
    defaults?: Record<string, any>;
    key: string;
  }
}
