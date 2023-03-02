import prod from "./prod";
import docs from "./docs";
import test from "./test";
export function getConfig(env: string) {
  switch (env) {
    case "prod":
      return prod;
    case "test":
      return test;
    case "docs":
      return docs;
    default:
      return prod;
  }
}
