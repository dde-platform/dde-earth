import { Earth } from './earth';

export abstract class BasePlugin<T extends any[] = any[]> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  public readonly name!: string;

  protected _earth: Earth | undefined;
  protected _enable = true;
  protected _destroyed = false;

  get earth() {
    return this._earth;
  }

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

  abstract init(_earth: Earth, ..._options: T): this;

  destroy(): void {
    this._destroyed = true;
  }
}

export namespace BasePlugin {
  export interface Options {
    name?: string;
  }
}

export abstract class WithEventPlugin<
  T extends any[] = any[],
  Events extends string = string,
  Args extends any[] = [],
> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  public readonly name!: string;
  public readonly eventList: Events[] = [];

  protected _earth!: Earth;
  protected _enable = true;
  protected _destroyed = false;

  get earth() {
    return this._earth;
  }

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

  constructor(options: WithEventPlugin.Options = {}) {
    const { name } = options;
    if (name) {
      this.name = name;
    }
  }

  abstract init(_earth: Earth, ..._options: T): any;

  abstract on(event: Events, fn: (...args: Args) => void): any;
  abstract off(event: Events, fn?: (...args: Args) => void): any;

  destroy(): void {
    this._destroyed = true;
  }
}

export namespace WithEventPlugin {
  export interface Options {
    name?: string;
  }
}

export type IPlugin = WithEventPlugin | BasePlugin;
