import { generateUUID } from "../utils";

import type { Earth } from "./earth";
import type { LayerManager } from "./layerManager";

export abstract class LayerItem<
  Lyr extends LayerManager.BaseLayer = LayerManager.BaseLayer,
  Instance = any,
> {
  readonly data: Lyr;
  readonly method: Lyr["method"];
  protected _instance?: Instance;
  readonly id: any;
  readonly readyPromise: Promise<this>;
  protected _ready: boolean = false;
  protected _isDestroyed: boolean = false;
  protected abstract readonly defaultRenderOptions: Lyr["renderOptions"];
  protected _renderOptions?: Lyr["renderOptions"];

  get renderOptions() {
    return this._renderOptions;
  }

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
    readonly options: LayerItem.Options,
  ) {
    this.id = data.id ?? generateUUID();
    this.data = { ...data, id: this.id };
    this._renderOptions = {
      ...options.defaultRenderOptions,
      ...data.renderOptions,
    };
    this.method = data.method;
    this.readyPromise = new Promise<this>((resolve, reject) => {
      this.init(data)
        .then((instance) => {
          this._instance = instance;
          this._ready = true;
          resolve(this);
        })
        .catch(reject);
    });
  }

  abstract init(data: Lyr): Promise<Instance>;
  abstract zoomTo(): void;
  abstract remove(): boolean | Promise<boolean>;
  abstract render(renderOptions: Lyr["renderOptions"]): void;

  destroy() {
    this.remove();
    this._ready = false;
    this._instance = undefined;
    this._isDestroyed = true;
  }
}

export namespace LayerItem {
  export interface Options<
    Lyr extends LayerManager.BaseLayer = LayerManager.BaseLayer,
  > {
    defaultRenderOptions: Lyr["renderOptions"];
  }
}
