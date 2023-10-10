import { BasePlugin, Earth, deepMerge } from 'dde-earth';

import { TIFFLayerItem } from './TIFFLayerItem';
import './api';

export class TIFFLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<TIFFLayerLoader.Options['defaultRenderOptions']>
  >;
  constructor(options?: TIFFLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      TIFFLayerItem.defaultRenderOptions,
      options?.defaultRenderOptions,
    ) as any;
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      tiff: async (earth: Earth, data: any) => {
        const { TIFFLayerItem } = await import('./TIFFLayerItem');
        return new TIFFLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
    });
    return this;
  }
}

export namespace TIFFLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: TIFFLayerItem.RenderOptions;
  }
  export interface Loaders {
    tiff: (earth: Earth, data: TIFFLayerItem.Data) => Promise<TIFFLayerItem>;
  }
}
