import { LayerItem } from "dde-earth";

import { DefaultRenderOptions } from "./constant";

import type { ImageryLayer } from "cesium";
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

  render(options: RasterLayerItem.RenderOptions) {
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
  }
}

export namespace RasterLayerItem {
  export type Instance = ImageryLayer;

  export interface RenderOptions {
    alpha?: number;
    brightness?: number;
    hue?: number;
    saturation?: number;
    gamma?: number;
    contrast?: number;
  }
}
