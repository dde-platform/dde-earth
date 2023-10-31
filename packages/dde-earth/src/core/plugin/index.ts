import type { BasePlugin } from "./basePlugin";
import type { WithEventPlugin } from "./withEventPlugin";

export * from "./basePlugin";
export * from "./withEventPlugin";

export type IPlugin = WithEventPlugin | BasePlugin;
