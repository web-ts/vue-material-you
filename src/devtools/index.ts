import { setupDevtoolsPlugin } from "@vue/devtools-api";
import { REGISTRY_URL } from "./constants";
import inspector from "./inspector";
import log from "./log";

export * from "./inspector";

export default function (app: any) {
  log(`Current Version: ${VERSION}`);

  fetch(REGISTRY_URL)
    .then((result) => result.json())
    .then((result) => {
      if (result["dist-tags"].latest !== VERSION) {
        log(`New Version Available: ${result["dist-tags"].latest}`, "#FFA500");
      } else {
        log("You are using the latest version!", "#AAAAFF");
      }
    });

  setupDevtoolsPlugin(
    {
      id: "vue-material-you-devtools-plugin",
      label: "Vue Material You Plugin",
      packageName: "vue-material-you",
      homepage: "",
      app
    },
    (api) => {
      inspector(api);
    }
  );
}
