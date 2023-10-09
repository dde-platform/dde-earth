import { ImageryLayer } from 'cesium';
import { LayerItem, LayerManager } from 'dde-earth';
import {
  TIFFImageryProvider,
  TIFFImageryProviderOptions,
  TIFFImageryProviderRenderOptions,
} from 'tiff-imagery-provider';

export class TIFFLayerItem extends LayerItem<
  TIFFLayerItem.Data,
  TIFFLayerItem.Instance
> {
  defaultRenderOptions = TIFFLayerItem.defaultRenderOptions;

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

  async render(options: TIFFLayerItem.RenderOptions) {
    if (
      Object.keys(options).some(
        (name) => !Object.keys(TIFFLayerItem.basicRenderOptions).includes(name),
      )
    ) {
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
              renderOptions: options,
            },
          );
          const layer = this.earth.viewer.imageryLayers.addImageryProvider(
            imageryProvider as any,
            index,
          );
          this._instance = layer;
        }
      } else {
        if (this.instance) {
          Object.entries(options).map(([name, value]) => {
            if (Object.prototype.hasOwnProperty.call(this.instance, name)) {
              (this.instance as any)[name] = value;
            }
          });
        }
      }

      this._renderOptions = {
        ...this._renderOptions,
        ...options,
      };
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

  export const basicRenderOptions: BasicRenderOptions = {
    brightness: 1,
    alpha: 1,
    gamma: 1,
    saturation: 1,
    contrast: 1,
    hue: 0,
  };

  export const defaultRenderOptions: RenderOptions = {
    ...basicRenderOptions,
  };
}
