import { deepMerge } from "../../utils";

import type { I18N } from "../../i18n";
import type { Earth } from "../earth";

export abstract class BasePlugin<
  InitOptions extends any[] = [],
  Intl extends Record<string, any> = any,
> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  readonly name: string = "";
  /** Internationalized Dictionary */
  protected _intl: I18N.ExtendMessages<Intl> = {};

  protected _earth!: Earth;
  protected _enable = true;
  protected _isDestroyed = false;

  get earth() {
    if (!this._earth) {
      throw new Error(
        `Can't find 'earth' in the prototype. Did you execute the '_init' function when implementing the 'init' function?`,
      );
    }
    return this._earth;
  }

  get viewer() {
    return this.earth?.viewer;
  }

  /** get or set plugin's enable */
  get enable(): boolean {
    return this._enable;
  }

  set enable(val: boolean) {
    this._enable = val;
  }

  get isDestroyed(): boolean {
    return this._isDestroyed;
  }

  constructor(options?: BasePlugin.Options<Intl>) {
    if (!this.name) this.name = this.constructor.name;

    const { name, intl = {} } = options || {};
    if (name) this.name = name;
    this._intl = deepMerge(this._intl, intl);
  }

  /** should be executed when implement init function */
  protected _init(_earth: Earth) {
    this._earth = _earth;

    // extends intl messages
    _earth.i18n.extend(this._intl);
    this._getT = _earth.i18n.getT.bind(_earth.i18n);
  }

  abstract init(_earth: Earth, ..._options: InitOptions): this;

  /** get translation's api */
  protected _getT!: I18N.TranslateFunc<Intl>;

  destroy(): void {
    this._isDestroyed = true;
  }
}

export namespace BasePlugin {
  export interface Options<Intl = any> {
    name?: string;
    intl?: I18N.ExtendMessages<Intl>;
  }
}
