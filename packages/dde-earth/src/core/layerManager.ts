import { ImageryLayer, Viewer } from 'cesium';

import { generateUUID } from '../utils';
import { Earth } from './earth';
import { LayerItem } from './layerItem';

export class LayerManager {
  private _isDestroyed: boolean = false;
  private _baseLayer?: ImageryLayer;
  private _layerList: LayerItem[] = [];
  private _loaders: LayerManager.Loaders = {};
  readonly viewer: Viewer;

  get isDestroyed() {
    return this._isDestroyed;
  }

  get baseLayer() {
    return this._baseLayer;
  }

  get layerList() {
    this._layerList = this._layerList.filter((layer) => !layer.isDestroyed);
    return this._layerList;
  }

  get loaders() {
    return this._loaders;
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
    this.earth.on('layer:remove', (id) => {
      this._layerList = this._layerList.filter((item) => item.id !== id);
    });
  }

  addLoader(loaders: Record<string, LayerManager.Loader>) {
    this._loaders = {
      ...this.loaders,
      ...loaders,
    };
  }

  removeLoader(method: string | string[]) {
    const methods = Array.isArray(method) ? method : [method];
    methods.forEach((item) => {
      if (this._loaders[item]) {
        delete this._loaders[item];
      }
    });
  }

  getLoaderByMethod<Method extends LayerManager.Methods = LayerManager.Methods>(
    method: Method,
  ) {
    return this._loaders[method];
  }

  async addLayer<Method extends LayerManager.Methods = LayerManager.Methods>(
    data: LayerManager.BaseLayer<Method>,
  ) {
    const { id = generateUUID(), method } = data;
    if (this.getLayerById(id)) {
      throw new Error(`Layer with id: "${id}" already exists`);
    }
    const loader = this.getLoaderByMethod(method);
    const layerItem = loader(this.earth, data as any);
    await layerItem.readyPromise;

    this._layerList.push(layerItem);
    this.earth.emit('layer:add', layerItem);
  }

  async removeLayer(param: string | LayerItem) {
    let layerItem: LayerItem | undefined;
    if (typeof param === 'string') {
      layerItem = this.getLayerById(param);
    } else {
      layerItem = param;
    }
    if (layerItem) {
      const bool = await layerItem.remove();
      if (bool) {
        this.earth.emit('layer:remove', layerItem.id);
        return true;
      }
    }
    return false;
  }

  getLayerById(id: string) {
    return this._layerList.find((layer) => layer.id === id);
  }

  destroy() {
    this.baseLayer = undefined;
    this._layerList.forEach((layer) => layer.destroy());
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

  export type Loader<T extends BaseLayer = BaseLayer, Instance = any> = (
    earth: Earth,
    data: T,
  ) => LayerItem<T, Instance>;

  export interface Loaders extends Record<string, Loader> {}

  export type Methods = keyof Loaders;

  export type LayerItems = ReturnType<Loaders[keyof Loaders]>;
}
