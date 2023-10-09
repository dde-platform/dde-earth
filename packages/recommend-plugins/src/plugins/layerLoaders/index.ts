import { BasePlugin, Earth, LayerManager, deepMerge } from 'dde-earth';

import { WMSLayerItem } from './WMSLayerItem';
import './api';

export class LayerLoaders extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<LayerLoaders.Options['defaultRenderOptions']>
  >;
  constructor(options?: LayerLoaders.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      options?.defaultRenderOptions,
      LayerLoaders.defaultRenderOptions,
    );
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      wms: async (earth: Earth, data: any) => {
        const { WMSLayerItem } = await import('./WMSLayerItem');
        return new WMSLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.wms,
        });
      },
    });
    return this;
  }
}

export namespace LayerLoaders {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: ExtractLoaderOptions<Loaders>;
  }
  export interface Loaders {
    wms: (earth: Earth, data: WMSLayerItem.Data) => Promise<WMSLayerItem>;
  }

  export type ExtractLoaderOptions<T extends Loaders> = {
    [K in keyof T]: T[K] extends LayerManager.Loader<infer U, any>
      ? U['renderOptions']
      : never;
  };

  export const defaultRenderOptions: NonNullable<
    Required<Options['defaultRenderOptions']>
  > = {
    wms: WMSLayerItem.defaultRenderOptions,
  };
}
