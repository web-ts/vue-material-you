import { DefineComponent } from "vue";

export interface InstallOptions {
  color: string;
  icon?: {
    component: DefineComponent<any, any, any, any>;
    defaults?: Record<string, any>;
    key: string;
  };
}
