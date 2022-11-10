import { DefineComponent } from "vue";

export interface VMConfiguration {
  icon?: {
    component: DefineComponent<any, any, any, any>;
    defaults?: Record<string, any>;
    key: string;
  }
}
