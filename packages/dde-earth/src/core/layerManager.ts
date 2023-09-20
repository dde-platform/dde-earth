import { ImageryLayer } from 'cesium';

export class LayerManager {
  private _destroyed: boolean = false;

  get destroyed() {
    return this._destroyed;
  }

  destroy() {
    this._destroyed = true;
  }
}

export namespace LayerManager {
  export interface Layer {
    raster: ImageryLayer;
  }
}
