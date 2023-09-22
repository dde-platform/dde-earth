import { I18N } from '../../i18n';
import { deepMerge } from '../../utils';
import { Earth } from '../earth';

export abstract class BasePlugin<
  InitOptions extends any[] = [],
  Intl extends Record<string, any> = any,
> {
  /** plugin name, do not repeat, will appear in warnings or errors */
  public readonly name!: string;
  /** Internationalized Dictionary */
  protected _intl: I18N.ExtendMessages<Intl> = {};

  protected _earth!: Earth;
  protected _enable = true;
  protected _isDestroyed = false;

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

  get isDestroyed(): boolean {
    return this._isDestroyed;
  }

  constructor(options?: BasePlugin.Options<Intl>) {
    const { name, intl = {} } = options || {};
    if (name) {
      this.name = name;
    }
    this._intl = deepMerge(this._intl, intl);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(_earth: Earth, ..._options: InitOptions): this {
    this._earth = _earth;

    // extends intl messages
    _earth.i18n.extend(this._intl);
    this._getT = _earth.i18n.getT.bind(_earth.i18n);

    return this;
  }

  /** get translation's api */
  protected _getT!: typeof I18N.prototype.getT<Intl>;

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
