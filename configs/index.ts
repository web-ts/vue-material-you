import prod from "./prod";
import docs from "./docs";
import test from "./test";
import playground from "./playground";

export function getConfig(env: string) {
  switch (env) {
    case "prod":
      return prod;
    case "test":
      return test;
    case "docs":
      return docs;
    case "playground":
      return playground;
    default:
      return prod;
  }
}
