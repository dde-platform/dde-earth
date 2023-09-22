import { findMostSimilarString } from '../utils';
import { Tail } from '../utils/types';
import { Earth } from './earth';
import { IPlugin, LayerPlugin, WithEventPlugin } from './plugin';

export class PluginManager {
  private _isDestroyed: boolean = false;
  constructor(
    readonly earth: Earth,
    public readonly plugins: Record<string, IPlugin> = {},
  ) {}

  get isDestroyed() {
    return this._isDestroyed;
  }

  use<T extends IPlugin>(plugin: T, ...options: Tail<Parameters<T['init']>>) {
    const name = plugin.name;
    if (!name) {
      throw new Error('The property pluginName is necessary');
    }
    if (this.plugins[name]) {
      this.remove(name);
      console.warn(
        `the is one plugin with same pluginName [${name}] exist, destroy the old instance`,
      );
    }
    this.plugins[name] = plugin.init(this.earth, ...options);
    return plugin;
  }

  get(name: string) {
    const plugin = this.plugins[name];
    if (!plugin) {
      const similarKey = findMostSimilarString(Object.keys(this.plugins), name);
      const msg =
        `Can't find plugin with name "${name}"` +
        (similarKey ? `, do you mean "${similarKey}"?` : '');
      throw new Error(msg);
    }
    return plugin;
  }

  getPluginWithEvent(event: string) {
    const plugins = Object.entries(this.plugins);
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i][1];
      if (
        plugin instanceof WithEventPlugin &&
        plugin.eventList.includes(event)
      ) {
        return plugin;
      }
    }
    throw new Error(
      `eventPlugin with event:"${event}" not found, please add loader`,
    );
  }

  getPluginWithMethod(method: string) {
    const plugins = Object.entries(this.plugins);
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i][1];
      if (plugin instanceof LayerPlugin && plugin.methodList.includes(method)) {
        return plugin;
      }
    }
    throw new Error(
      `layerPlugin with method:"${method}" not found, please add loader`,
    );
  }

  remove(name: string | string[]) {
    const names = Array.isArray(name) ? name : [name];
    names.forEach((name) => {
      this.plugins[name]?.destroy();
      delete this.plugins[name];
    });
  }

  destroy() {
    this.remove(Object.keys(this.plugins));
    // @ts-ignore
    this.plugins = undefined;
    this._isDestroyed = true;
  }
}
