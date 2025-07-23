/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { BasePlugin, deepMerge } from "dde-earth";

import { AmapLayerItem } from "./AmapLayerItem";
import { AmapDefaultRenderOptions } from "./constant";

import type { Earth } from "dde-earth";

export class AmapLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<AmapLayerLoader.Options["defaultRenderOptions"]>
  >;
  constructor(options?: AmapLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      AmapDefaultRenderOptions,
      options?.defaultRenderOptions,
    ) as any;
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      amap: async (earth: Earth, data: any) => {
        return new AmapLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
    });
    return this;
  }
}

export namespace AmapLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: AmapLayerItem.RenderOptions;
  }
  export interface Loaders {
    amap: (earth: Earth, data: AmapLayerItem.Data) => Promise<AmapLayerItem>;
  }
}
