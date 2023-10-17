import { BasePlugin, deepMerge } from 'dde-earth';

import { defaultRenderOptions } from './constant';

import type { Earth } from 'dde-earth';
import type { MVTLayerItem } from './MVTLayerItem';

export class MVTLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<MVTLayerLoader.Options['defaultRenderOptions']>
  >;
  constructor(options?: MVTLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      defaultRenderOptions,
      options?.defaultRenderOptions,
    ) as any;
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      mvt: async (earth: Earth, data: any) => {
        const { MVTLayerItem } = await import('./MVTLayerItem');
        return new MVTLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
    });
    return this;
  }
}

export namespace MVTLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: MVTLayerItem.RenderOptions;
  }
  export interface Loaders {
    mvt: (earth: Earth, data: MVTLayerItem.Data) => Promise<MVTLayerItem>;
  }
}
