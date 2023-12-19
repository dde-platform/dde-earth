import { BasePlugin } from "dde-earth";

import { DefaultGeoJsonRenderOptions } from "./constant";

import type { Earth } from "dde-earth";
import type { GeoJsonLayerItem } from "./GeoJsonLayerItem";
import type { PrimitiveGeojsonLayerItem } from "./PrimitiveGeoJsonLayerItem";

export class GeoJsonLayerLoader extends BasePlugin {
  constructor(options?: GeoJsonLayerLoader.Options) {
    super(options);
  }
  defaultRenderOptions = DefaultGeoJsonRenderOptions;

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      geojson: async (earth: Earth, data: any) => {
        const { GeoJsonLayerItem } = await import("./GeoJsonLayerItem");
        return new GeoJsonLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
      primitiveGeojson: async (earth: Earth, data: any) => {
        const { PrimitiveGeojsonLayerItem } = await import(
          "./PrimitiveGeoJsonLayerItem"
        );
        return new PrimitiveGeojsonLayerItem(earth, data, {
          defaultRenderOptions: this.defaultRenderOptions,
        });
      },
    });
    return this;
  }
}

export namespace GeoJsonLayerLoader {
  export interface Options extends BasePlugin.Options {
    defaultRenderOptions?: typeof DefaultGeoJsonRenderOptions;
  }
  export interface Loaders {
    geojson: (
      earth: Earth,
      data: GeoJsonLayerItem.Data,
    ) => Promise<GeoJsonLayerItem>;
    primitiveGeojson: (
      earth: Earth,
      data: PrimitiveGeojsonLayerItem.Data,
    ) => Promise<PrimitiveGeojsonLayerItem>;
  }
}
