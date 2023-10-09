import { BasePlugin, Earth, LayerManager, deepMerge } from 'dde-earth';

import { TIFFLayerItem } from './TIFFLayerItem';
import './api';

export class TIFFLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<TIFFLayerLoader.Options['defaultRenderOptions']>
  >;
  constructor(options?: TIFFLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      options?.defaultRenderOptions,
      TIFFLayerLoader.defaultRenderOptions,
    );
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      tiff: async (earth: Earth, data: any) => {
        const { TIFFLayerItem } = await import('./TIFFLayerItem');
        return new TIFFLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.tiff,
        });
      },
    });
    return this;
  }
}

export namespace TIFFLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: ExtractLoaderOptions<Loaders>;
  }
  export interface Loaders {
    tiff: (earth: Earth, data: TIFFLayerItem.Data) => Promise<TIFFLayerItem>;
  }

  export type ExtractLoaderOptions<T extends Loaders> = {
    [K in keyof T]: T[K] extends LayerManager.Loader<infer U, any>
      ? U['renderOptions']
      : never;
  };

  export const defaultRenderOptions: NonNullable<
    Required<Options['defaultRenderOptions']>
  > = {
    tiff: TIFFLayerItem.defaultRenderOptions,
  };
}
