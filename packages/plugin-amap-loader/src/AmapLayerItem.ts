/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ImageryLayer, UrlTemplateImageryProvider } from "cesium";
import { LayerItem } from "dde-earth";

import AmapMercatorTilingScheme from "./AmapMercatorTilingScheme";
import { AmapDefaultRenderOptions } from "./constant";

import type { LayerManager } from "dde-earth";

export class AmapLayerItem extends LayerItem<
  AmapLayerItem.Data,
  AmapLayerItem.Instance
> {
  defaultRenderOptions = AmapDefaultRenderOptions;

  get show() {
    return this.instance?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) this.instance.show = val;
  }

  async _init(data: AmapLayerItem.Data) {
    const imageryProvider = new UrlTemplateImageryProvider(
      this.handleData(data),
    );
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }

  _remove() {
    if (this.instance) {
      return this.earth.viewer.imageryLayers.remove(this.instance);
    }
    return false;
  }

  zoomTo() {
    if (this.instance) {
      this.earth.viewer.flyTo(this.instance, {
        duration: 1,
      });
    }
  }

  handleData<T extends AmapLayerItem.Data>(data: T) {
    return {
      ...data,
      subdomains: ["01", "02", "03", "04"],
      tilingScheme: new AmapMercatorTilingScheme(),
    };
  }

  async _render(
    options: AmapLayerItem.RenderOptions,
    instance = this.instance,
  ) {
    if (instance) {
      Object.entries(options).map(([name, value]) => {
        if (Object.prototype.hasOwnProperty.call(instance, name)) {
          (instance as any)[name] = value;
        }
      });
    }
    this._renderOptions = {
      ...this._renderOptions,
      ...options,
    };
    this.earth.viewer.scene.requestRender();
    return instance;
  }
}

export namespace AmapLayerItem {
  export type Instance = ImageryLayer;

  export type Data<
    Method = any,
    Render extends Record<string, any> = any,
  > = LayerManager.BaseLayer<Method, Render> & {
    url: string;
    minimumLevel?: number;
    maximumLevel?: number;
  };

  export interface RenderOptions {
    alpha?: number;
    brightness?: number;
    hue?: number;
    saturation?: number;
    gamma?: number;
    contrast?: number;
  }
}
