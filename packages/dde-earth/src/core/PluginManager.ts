import { Tail } from '../utils/types';
import { Earth } from './earth';
import { BasePlugin } from './plugin';

export class PluginManager {
  private _destroyed: boolean = false;
  constructor(
    readonly earth: Earth,
    public readonly plugins: Record<string, BasePlugin> = {},
  ) {}

  get destroyed() {
    return this._destroyed;
  }

  use<T extends BasePlugin>(
    plugin: T,
    ...options: Tail<Parameters<T['init']>>
  ) {
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
  }

  get(name: string) {
    return this.plugins[name];
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
    this._destroyed = true;
  }
}
