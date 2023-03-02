import { darkModeOptions as settings } from "@/color";
import {
  CustomInspectorNode,
  CustomInspectorState,
  DevtoolsPluginApi,
  ExtractSettingsTypes,
  PluginSettingsItem
} from "@vue/devtools-api";
import { INSPECTOR_ICON, INSPECTOR_ID, INSPECTOR_LABEL } from "./constants";

type Api = DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>;

/**
 * Default nodes for the inspector
 */
export const nodes: Array<CustomInspectorNode> = [
  {
    id: "quick-settings",
    label: "Quick Settings"
  },
  {
    id: "forms",
    label: "Forms",
    children: []
  }
];

export const state: Record<string, CustomInspectorState> = {};

let api: Api | undefined;

export function updateFormState(globalState: Record<string, any>) {
  state.forms = globalState;
  Object.entries(globalState).forEach(([key, value]) => {
    const { state: formState, validity } = value;

    state[key] = {
      "input state": Object.entries(formState).map(([name, value]) => ({
        key: name,
        value
      })),
      "input validity": Object.entries(validity).map(([name, value]) => ({
        key: name,
        value
      }))
    };
  });
  api?.sendInspectorState(INSPECTOR_ID);
}

export function registerToNode(nodeId: string, data: CustomInspectorNode) {
  const node = nodes.find((node) => node.id === nodeId);

  if (!node || !node.children) return;
  node.children.push(data);
  api?.sendInspectorTree(INSPECTOR_ID);
}

export function removeFromNodes(nodeId: string, id: string) {
  const node = nodes.find((node) => node.id === nodeId);

  if (node && node.children) {
    node.children = node.children.filter((node) => node.id !== id);
  }

  api?.sendInspectorTree(INSPECTOR_ID);
}

export default function (devtoolsApi: Api) {
  api = devtoolsApi;

  api.addInspector({
    id: INSPECTOR_ID,
    label: INSPECTOR_LABEL,
    icon: INSPECTOR_ICON
  });

  api.on.getInspectorTree((payload) => {
    if (payload.inspectorId !== INSPECTOR_ID) return;
    payload.rootNodes = nodes;
  });

  api.on.getInspectorState((payload) => {
    if (payload.inspectorId !== INSPECTOR_ID) return;
    if (state[payload.nodeId]) payload.state = state[payload.nodeId];

    if (payload.nodeId === "quick-settings") {
      payload.state = {
        "dark mode": [
          {
            key: "settings",
            value: settings,
            editable: true
          },
          {
            key: "isDarkMode",
            value:
              settings.userMode === "light" ? false : settings.userMode === "dark" || settings.systemMode === "dark",
            editable: true
          }
        ]
      };
    }
  });

  api.on.editInspectorState((payload) => {
    if (payload.inspectorId !== INSPECTOR_ID) return;
    if (payload.nodeId === "quick-settings") {
      const { path, state } = payload;

      switch (path[0]) {
        case "settings":
          settings.userMode = state.value;
          break;
        case "isDarkMode":
          settings.userMode = state.value ? "dark" : "light";
          break;
      }
    }
  });

  watch(settings, () => {
    api?.sendInspectorState(INSPECTOR_ID);
  });
}
