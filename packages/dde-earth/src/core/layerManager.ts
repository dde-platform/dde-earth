import { ImageryLayer, Viewer } from 'cesium';

import { Earth } from './earth';
import { LayerItem } from './layerItem';

export class LayerManager {
  private _isDestroyed: boolean = false;
  private _baseLayer?: ImageryLayer;
  private _layerList: LayerItem[] = [];
  readonly viewer: Viewer;

  get isDestroyed() {
    return this._isDestroyed;
  }

  get baseLayer() {
    return this._baseLayer;
  }

  get layerList() {
    return this._layerList;
  }

  set baseLayer(layer: ImageryLayer | undefined) {
    if (this._baseLayer) {
      this.viewer.imageryLayers.remove(this._baseLayer);
    }
    if (layer) {
      this.viewer.imageryLayers.add(layer);
      this.viewer.imageryLayers.lowerToBottom(layer);
    }
    this._baseLayer = layer;
  }

  constructor(readonly earth: Earth) {
    this.viewer = earth.viewer;
  }

  add(layer: LayerItem<any>) {
    const { id } = layer;
    if (this.getLayerById(id)) {
      throw new Error(`Layer with id: "${id}" already exists`);
    }

    this._layerList.push(layer);
  }

  remove(layer: LayerItem<any>) {
    this._layerList = this._layerList.filter((item) => item !== layer);
  }

  getLayerById(id: string) {
    return this._layerList.find((layer) => layer.id === id);
  }

  destroy() {
    this.baseLayer = undefined;
    this._layerList = [];
    this._isDestroyed = true;
  }
}

export namespace LayerManager {
  export interface BaseLayer<
    Method = string,
    Render extends Record<string, any> = any,
  > {
    id?: string;
    layerName: string;
    method: Method;
    renderOptions?: Render;
  }

  export interface LayerValue<
    Lyr extends LayerManager.BaseLayer = LayerManager.BaseLayer,
    Instance = any,
  > {
    metaData: Lyr;
    instance: Instance;
  }

  export interface LayerMap extends Record<string, LayerValue> {}

  export type LayerMethod = keyof LayerMap;

  export type Layer = LayerMap[keyof LayerMap];
}
