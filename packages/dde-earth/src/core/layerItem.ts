import { generateUUID } from '../utils';
import { Earth } from './earth';
import { LayerManager } from './layerManager';

export abstract class LayerItem<
  Lyr extends LayerManager.BaseLayer = LayerManager.BaseLayer,
  Instance = any,
> {
  readonly data: Lyr;
  readonly method: Lyr['method'];
  private _instance?: Instance;
  readonly id: any;
  readonly readyPromise: Promise<this>;
  private _ready: boolean = false;
  private _isDestroyed: boolean = false;

  get isDestroyed() {
    return this._isDestroyed;
  }

  get ready() {
    return this._ready;
  }

  abstract get show(): boolean;
  abstract set show(value: boolean);

  get instance() {
    return this._instance;
  }

  constructor(
    readonly earth: Earth,
    data: Lyr,
  ) {
    this.id = data.id ?? generateUUID();
    this.data = { ...data, id: this.id };
    this.method = data.method;
    this.readyPromise = new Promise<this>((resolve, reject) => {
      this._init(data)
        .then((instance) => {
          this._instance = instance;
          this._ready = true;
          resolve(this);
        })
        .catch(reject);
    });
  }

  abstract _init(data: Lyr): Promise<Instance>;
  abstract zoomTo(): void;
  abstract remove(): boolean | Promise<boolean>;
  abstract render: (
    renderOptions: Lyr['renderOptions'],
  ) => boolean | Promise<boolean>;

  destroy() {
    this.remove();
    this._ready = false;
    this._instance = undefined;
    this._isDestroyed = true;
  }
}
