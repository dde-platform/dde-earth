import {
  GeographicTilingScheme,
  type ImageryLayer,
  WebMercatorTilingScheme,
} from "cesium";
import { LayerItem } from "dde-earth";

import { DefaultRenderOptions } from "./constant";

import type { LayerManager } from "dde-earth";

export abstract class RasterLayerItem<
  Data extends LayerManager.BaseLayer,
> extends LayerItem<Data, RasterLayerItem.Instance> {
  defaultRenderOptions = DefaultRenderOptions.raster;

  get show() {
    return this.instance?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) this.instance.show = val;
  }

  remove() {
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

  handleData<T extends RasterLayerItem.Data>(data: T) {
    const { srs } = data;
    let tilingScheme = new WebMercatorTilingScheme();

    if (srs && /4326|4490/.test(srs)) {
      tilingScheme = new GeographicTilingScheme();
    }

    return {
      ...data,
      tilingScheme,
    };
  }

  async render(options: RasterLayerItem.RenderOptions) {
    if (this.instance) {
      Object.entries(options).map(([name, value]) => {
        if (Object.prototype.hasOwnProperty.call(this.instance, name)) {
          (this.instance as any)[name] = value;
        }
      });
    }
    this._renderOptions = {
      ...this._renderOptions,
      ...options,
    };
    this.earth.viewer.scene.requestRender();
    return this.instance;
  }
}

export namespace RasterLayerItem {
  export type Instance = ImageryLayer;

  export type Data<
    Method = any,
    Render extends Record<string, any> = any,
  > = LayerManager.BaseLayer<Method, Render> & {
    srs?: string;
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
