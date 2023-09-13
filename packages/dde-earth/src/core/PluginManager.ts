import { Tail } from '../utils/ts';
import { Earth } from './Earth';

export class PluginManager {
  private _destroyed: boolean = false;
  plugins: Record<string, Earth.Plugin> = {};
  constructor(readonly earth: Earth) {}

  get destroyed() {
    return this._destroyed;
  }

  use<T extends Earth.Plugin>(
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

  destory() {
    this.remove(Object.keys(this.plugins));
    // @ts-ignore
    this.plugins = undefined;
    this._destroyed = true;
  }
}
