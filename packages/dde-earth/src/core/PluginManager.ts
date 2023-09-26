import { findMostSimilarString } from '../utils';
import { Tail } from '../utils/types';
import { Earth } from './earth';
import { IPlugin, WithEventPlugin } from './plugin';

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

  get(param: string | Function) {
    if (typeof param === 'string') {
      const plugin = this.plugins[param];
      if (!plugin) {
        const similarKey = findMostSimilarString(
          Object.keys(this.plugins),
          param,
        );
        const msg =
          `Can't find plugin with name "${param}"` +
          (similarKey ? `, do you mean "${similarKey}"?` : '');
        throw new Error(msg);
      }
      return plugin;
    }
    if (typeof param === 'function') {
      return Object.values(this.plugins).find(
        (plugin) => plugin instanceof param,
      );
    }
  }

  getPluginWithEvent<T extends Earth.EventTypes = Earth.EventTypes>(event: T) {
    const plugins = Object.entries(this.plugins);
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i][1];
      if (
        plugin instanceof WithEventPlugin &&
        plugin.eventList.includes(event)
      ) {
        return plugin as WithEventPlugin<any[], any, T, Earth.Events[T]>;
      }
    }
    throw new Error(
      `eventPlugin with event:"${event}" not found, please add loader`,
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
