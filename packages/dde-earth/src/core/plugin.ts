import { Earth } from './earth';
import { EventEmitter } from './event';

export abstract class BasePlugin<T extends any[] = any[]> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  public readonly name!: string;

  protected _enable = true;
  protected _destroyed = false;

  /** get or set plugin's enable */
  get enable(): boolean {
    return this._enable;
  }
  set enable(val: boolean) {
    this._enable = val;
  }
  get destroyed(): boolean {
    return this._destroyed;
  }

  constructor(options?: BasePlugin.Options) {
    const { name } = options || {};
    if (name) {
      this.name = name;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_earth: Earth, ..._options: T): this {
    return this;
  }

  on?: EventEmitter.EventFunc;

  destroy(): void {
    this._destroyed = true;
  }
}

export namespace BasePlugin {
  export interface Options {
    name?: string;
  }
}
