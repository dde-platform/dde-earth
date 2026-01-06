/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import { BasePlugin, deepMerge } from "dde-earth";

import { ArcGisLayerItem } from "./ArcGisLayerItem";
import { PICLayerItem } from "./PICLayerItem";
import { TMSLayerItem } from "./TMSLayerItem";
import { WMSLayerItem } from "./WMSLayerItem";
import { WMTSLayerItem } from "./WMTSLayerItem";
import { DefaultRenderOptions } from "./constant";

import type { Earth, LayerManager } from "dde-earth";

export class LayerLoaders extends BasePlugin {
  readonly defaultRenderOptions: NonNullable<
    Required<LayerLoaders.Options["defaultRenderOptions"]>
  >;
  name = "LayerLoaders";

  constructor(options?: LayerLoaders.Options) {
    super(options);
    this.defaultRenderOptions = deepMerge(
      LayerLoaders.defaultRenderOptions,
      options?.defaultRenderOptions,
    );
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      wms: (earth: Earth, data: any) => {
        return new WMSLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.wms,
        });
      },
      wmts: (earth: Earth, data: any) => {
        return new WMTSLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.wmts,
        });
      },
      tms: (earth: Earth, data: any) => {
        return new TMSLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.tms,
        });
      },
      arcgis: (earth: Earth, data: any) => {
        return new ArcGisLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.arcgis,
        });
      },
      pic: (earth: Earth, data: any) => {
        return new PICLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions.pic,
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
    wmts: (earth: Earth, data: WMTSLayerItem.Data) => Promise<WMTSLayerItem>;
    tms: (earth: Earth, data: TMSLayerItem.Data) => Promise<TMSLayerItem>;
    arcgis: (
      earth: Earth,
      data: ArcGisLayerItem.Data,
    ) => Promise<ArcGisLayerItem>;
    pic: (earth: Earth, data: PICLayerItem.Data) => Promise<PICLayerItem>;
  }

  export type ExtractLoaderOptions<T extends Loaders> = {
    [K in keyof T]?: T[K] extends LayerManager.Loader<infer U, any>
      ? U["renderOptions"]
      : never;
  };

  export const defaultRenderOptions: NonNullable<
    Required<Options["defaultRenderOptions"]>
  > = {
    wms: DefaultRenderOptions.raster,
    wmts: DefaultRenderOptions.raster,
    tms: DefaultRenderOptions.raster,
    arcgis: DefaultRenderOptions.raster,
    pic: DefaultRenderOptions.raster,
  };
}
