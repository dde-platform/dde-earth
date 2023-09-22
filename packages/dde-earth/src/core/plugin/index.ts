import { BasePlugin } from './basePlugin';
import { LayerPlugin } from './layerPlugin';
import { WithEventPlugin } from './withEventPlugin';

export * from './basePlugin';
export * from './withEventPlugin';
export * from './layerPlugin';

export type IPlugin = WithEventPlugin | BasePlugin | LayerPlugin;
