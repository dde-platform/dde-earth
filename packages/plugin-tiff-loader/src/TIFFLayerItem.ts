import { LayerItem } from 'dde-earth';
import { TIFFImageryProvider } from 'tiff-imagery-provider';

import { basicRenderOptions, defaultRenderOptions } from './constant';

import type { ImageryLayer } from 'cesium';
import type { LayerManager } from 'dde-earth';
import type {
  TIFFImageryProviderOptions,
  TIFFImageryProviderRenderOptions,
} from 'tiff-imagery-provider';

export class TIFFLayerItem extends LayerItem<
  TIFFLayerItem.Data,
  TIFFLayerItem.Instance
> {
  defaultRenderOptions = defaultRenderOptions;

  get show() {
    return this.instance?.show ?? false;
  }

  set show(val: boolean) {
    if (this.instance) this.instance.show = val;
  }

  async init(data: TIFFLayerItem.Data) {
    const imageryProvider = await TIFFImageryProvider.fromUrl(data.url, {
      ...data,
      renderOptions: data.renderOptions,
    });
    this._basicRender(data.renderOptions);
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

  private _basicRender(options: TIFFLayerItem.BasicRenderOptions = {}) {
    if (this.instance) {
      Object.entries(options).map(([name, value]) => {
        if (
          Object.keys(basicRenderOptions).includes(name) &&
          Object.prototype.hasOwnProperty.call(this.instance, name)
        ) {
          (this.instance as any)[name] = value;
        }
      });
    }
  }

  async render(options: TIFFLayerItem.RenderOptions) {
    if (
      Object.keys(options).some(
        (name) => !Object.keys(basicRenderOptions).includes(name),
      )
    ) {
      this._renderOptions = {
        ...this._renderOptions,
        ...options,
      };

      if (this.instance) {
        const index = this.earth.viewer.imageryLayers.indexOf(this.instance);
        const bool = this.earth.viewer.imageryLayers.remove(
          this.instance,
          true,
        );
        if (bool) {
          const imageryProvider = await TIFFImageryProvider.fromUrl(
            this.data.url,
            {
              ...this.data,
              renderOptions: this._renderOptions,
            },
          );
          const layer = this.earth.viewer.imageryLayers.addImageryProvider(
            imageryProvider as any,
            index,
          );
          this._instance = layer;
        }
      }

      this._basicRender(this._renderOptions);

      this.earth.viewer.scene.requestRender();
    }
  }
}

export namespace TIFFLayerItem {
  export type Method = 'tiff';

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    TIFFImageryProviderOptions & {
      url: string | File | Blob;
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

  export type RenderOptions = BasicRenderOptions &
    TIFFImageryProviderRenderOptions;
}
