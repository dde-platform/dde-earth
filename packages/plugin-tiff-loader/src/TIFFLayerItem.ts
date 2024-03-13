import { LayerItem } from "dde-earth";
import { TIFFImageryProvider } from "tiff-imagery-provider";

import { basicRenderOptions, defaultRenderOptions } from "./constant";

import type { ImageryLayer } from "cesium";
import type { LayerManager } from "dde-earth";
import type {
  TIFFImageryProviderOptions,
  TIFFImageryProviderRenderOptions,
} from "tiff-imagery-provider";

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

  async _init(data: TIFFLayerItem.Data) {
    const options = { ...data, renderOptions: data.renderOptions };
    if ((options as any).url) delete (options as any).url;
    const imageryProvider = await TIFFImageryProvider.fromUrl(
      data.url,
      options,
    );
    const layer = this.earth.viewer.imageryLayers.addImageryProvider(
      imageryProvider as any,
    );
    TIFFLayerItem.basicRender(layer, data.renderOptions);
    return layer;
  }

  _remove() {
    if (this.instance) {
      return this.earth.viewer.imageryLayers.remove(this.instance);
    }
    return false;
  }

  zoomTo(options: LayerItem.ZoomToOptions = {}) {
    if (this.instance) {
      this.earth.viewer.flyTo(this.instance, {
        duration: 1,
        ...options,
      });
    }
  }

  static basicRender(
    layer: ImageryLayer | undefined,
    options: TIFFLayerItem.BasicRenderOptions = {},
  ) {
    if (layer) {
      Object.entries(options).map(([name, value]) => {
        if (
          Object.keys(basicRenderOptions).includes(name) &&
          Object.prototype.hasOwnProperty.call(layer, name)
        ) {
          (layer as any)[name] = value;
        }
      });
    }
  }

  async _render(options: TIFFLayerItem.RenderOptions) {
    this._renderOptions = {
      ...this._renderOptions,
      ...options,
    };
    if (
      Object.keys(options).some(
        (name) => !Object.keys(basicRenderOptions).includes(name),
      )
    ) {
      const newOptions = {
        ...this.data,
        renderOptions: this._renderOptions,
      };
      if (this.instance) {
        if ((newOptions as any).url) delete (newOptions as any).url;
        const imageryProvider = await TIFFImageryProvider.fromUrl(
          this.data.url,
          newOptions,
        );
        const index = this.earth.viewer.imageryLayers.indexOf(this.instance);
        const bool = this.earth.viewer.imageryLayers.remove(
          this.instance,
          true,
        );
        if (bool) {
          const layer = this.earth.viewer.imageryLayers.addImageryProvider(
            imageryProvider as any,
            index,
          );
          this._instance = layer;
        }
      }
    }

    TIFFLayerItem.basicRender(this.instance, this._renderOptions);

    this.earth.viewer.scene.requestRender();
    return this.instance;
  }
}

export namespace TIFFLayerItem {
  export type Method = "tiff";

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
