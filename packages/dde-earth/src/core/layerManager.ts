import { ImageryLayer } from 'cesium';

import { generateUUID } from '../utils';

import type { Viewer } from 'cesium';
import type { Earth } from './earth';
import type { LayerItem } from './layerItem';

export class LayerManager {
  private _isDestroyed: boolean = false;
  private _baseLayer?: ImageryLayer;
  private _layerList: LayerItem[] = [];
  private _loaders: Record<string, LayerManager.Loader> = {};
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

  constructor(
    readonly earth: Earth,
    options: LayerManager.Options = {},
  ) {
    this.viewer = earth.viewer;
    const { baseLayer } = options;
    if (baseLayer instanceof ImageryLayer) {
      this._baseLayer = baseLayer;
    }

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

  getLoaderByMethod(method: string) {
    return this._loaders[method];
  }

  async addLayer<
    Method extends LayerManager.LoaderMethods = LayerManager.LoaderMethods,
  >(
    data: LayerManager.LoaderTypes[Method]['data'],
    options?: LayerManager.AddLayerOptions,
  ): Promise<
    Awaited<LayerManager.LoaderTypes[Method]['layerItem']> | undefined
  > {
    const { id = generateUUID(), method } = data;
    if (this.getLayerById(id)) {
      throw new Error(`Layer with id: "${id}" already exists`);
    }
    const loader = this.getLoaderByMethod(method);
    if (!loader) {
      throw new Error(
        `Layer loader with method "${method}" not found, please add loader`,
      );
    }
    const layerItem = await loader(this.earth, data as any);
    await layerItem.readyPromise;

    this._layerList.push(layerItem);
    this.earth.emit('layer:add', layerItem);

    if (options?.zoom) {
      layerItem.zoomTo();
    }
    return layerItem as any;
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
  export interface Options {
    baseLayer?: false | ImageryLayer;
  }

  export interface AddLayerOptions {
    zoom?: boolean;
  }

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
  ) => LayerItem<T, Instance> | Promise<LayerItem<T, Instance>>;

  export interface Loaders {}

  type ExtractLoaderTypes<T extends Loaders> = {
    [K in keyof T]: {
      data: T[K] extends Loader<infer U, any> ? U : never;
      instance: T[K] extends Loader<any, infer V> ? V : any;
      layerItem: T[K] extends Loader ? ReturnType<T[K]> : any;
    };
  };

  export type LoaderTypes = ExtractLoaderTypes<Loaders>;

  export type LoaderMethods = keyof LoaderTypes;
}
