import { LayerItem } from 'dde-earth';
import MVTImageryProvider from 'mvt-imagery-provider';

import { defaultRenderOptions } from './constant';

import type { ImageryLayer, Resource } from 'cesium';
import type { LayerManager } from 'dde-earth';
import type {
  MVTImageryProviderOptions,
  StyleSpecification,
} from 'mvt-imagery-provider';

export class MVTLayerItem extends LayerItem<
  MVTLayerItem.Data,
  MVTLayerItem.Instance
> {
  defaultRenderOptions = defaultRenderOptions;
  get show() {
    return this.instance?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) this.instance.show = val;
  }

  async init(data: MVTLayerItem.Data) {
    const imageryProvider = await MVTImageryProvider.fromUrl(data.url, {
      ...data,
    });
    const layer = this.earth.viewer.imageryLayers.addImageryProvider(
      imageryProvider as any,
    );
    return layer;
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

  async render(options: MVTLayerItem.RenderOptions) {
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

export namespace MVTLayerItem {
  export type Method = 'mvt';

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    MVTImageryProviderOptions & {
      url: Resource | string | StyleSpecification;
    };

  export type Instance = ImageryLayer;

  export type BasicRenderOptions = {
    alpha?: number;
    brightness?: number;
    hue?: number;
    saturation?: number;
    gamma?: number;
    contrast?: number;
  };

  export type RenderOptions = BasicRenderOptions;
}
