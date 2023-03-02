import getChildRoutes from "@docs/utils/get-child-routes";

export const routes: Array<any> = getChildRoutes(import.meta.glob("../modules/*/index.ts", { eager: true }));
