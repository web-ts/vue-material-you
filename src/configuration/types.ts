import { DefineComponent } from "vue";

export interface VMUOptions {
  icon: {
    component: DefineComponent<any, any, any, any, any, any, any, any, any, any, any, any>;
    defaults?: Record<string, any>;
    key: string;
  };
}
