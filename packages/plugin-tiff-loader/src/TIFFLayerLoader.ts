import { BasePlugin, deepMerge } from "dde-earth";

import { defaultRenderOptions } from "./constant";

import type { Earth } from "dde-earth";
import type { TIFFLayerItem } from "./TIFFLayerItem";

export class TIFFLayerLoader extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<TIFFLayerLoader.Options["defaultRenderOptions"]>
  >;
  constructor(options?: TIFFLayerLoader.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      defaultRenderOptions,
      options?.defaultRenderOptions,
    ) as any;
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      tiff: async (earth: Earth, data: any) => {
        const { TIFFLayerItem } = await import("./TIFFLayerItem");
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
