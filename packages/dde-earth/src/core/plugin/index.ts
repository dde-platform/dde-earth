import { BasePlugin } from './basePlugin';
import { WithEventPlugin } from './withEventPlugin';

export * from './basePlugin';
export * from './withEventPlugin';

export type IPlugin = WithEventPlugin | BasePlugin;
