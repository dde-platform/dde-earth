import { BasePlugin, deepMerge } from "dde-earth";

import { defaultRenderOptions } from "./constant";

import type { Earth } from "dde-earth";
import type { NCLayerItem } from "./NCLayerItem";

export class NCLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<NCLayerLoader.Options["defaultRenderOptions"]>
  >;
  constructor(options?: NCLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      defaultRenderOptions,
      options?.defaultRenderOptions,
    ) as any;
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      nc: async (earth: Earth, data: any) => {
        const { NCLayerItem } = await import("./NCLayerItem");
        return new NCLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
    });
    return this;
  }
}

export namespace NCLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: NCLayerItem.RenderOptions;
  }
  export interface Loaders {
    nc: (earth: Earth, data: NCLayerItem.Data) => Promise<NCLayerItem>;
  }
}
