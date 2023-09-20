import { I18N } from '../i18n';
import { deepMerge } from '../utils';
import { Earth } from './earth';

export abstract class BasePlugin<
  T extends any[] = [],
  Intl extends Record<string, any> = any,
> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  public readonly name!: string;
  /** Internationalized Dictionary */
  protected _intl: I18N.ExtendMessages<Intl> = {};

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

  constructor(options?: BasePlugin.Options<Intl>) {
    const { name, intl = {} } = options || {};
    if (name) {
      this.name = name;
    }
    deepMerge(this._intl, intl);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_earth: Earth, ..._options: T): this {
    this._earth = _earth;

    // extends intl messages
    _earth.i18n.extend(this._intl);
    this._getT = _earth.i18n.getT.bind(_earth.i18n);

    return this;
  }

  /** get translation's api */
  protected _getT!: typeof I18N.prototype.getT<Intl>;

  destroy(): void {
    this._destroyed = true;
  }
}

export namespace BasePlugin {
  export interface Options<Intl = any> {
    name?: string;
    intl?: I18N.ExtendMessages<Intl>;
  }
}

export abstract class WithEventPlugin<
  T extends any[] = any[],
  Intl extends Record<string, any> = any,
  Events extends string = string,
  Args extends any[] = [],
> extends BasePlugin<T, Intl> {
  public readonly eventList: Events[] = [];

  constructor(options?: WithEventPlugin.Options<Intl>) {
    super(options);
  }

  abstract on(event: Events, fn: (...args: Args) => void): any;
  abstract off(event: Events, fn?: (...args: Args) => void): any;
}

export namespace WithEventPlugin {
  export interface Options<Intl = any> extends BasePlugin.Options<Intl> {}
}

export type IPlugin = WithEventPlugin | BasePlugin;
