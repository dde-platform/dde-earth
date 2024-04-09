import { BasePlugin } from "dde-earth";

import type { MartiniTerrainProvider } from "@zjugis/cesium-martini";
import type { Ellipsoid, Resource } from "cesium";
import type { Earth } from "dde-earth";

import "./api";

export class MartiniTerrainLoader extends BasePlugin {
  name = "MartiniTerrain";

  init(earth: Earth) {
    this._init(earth);
    this.earth.terrainManager.addLoader({
      martini: async (data) => {
        const { MartiniTerrainProvider } = await import(
          "@zjugis/cesium-martini"
        );
        return new MartiniTerrainProvider(data);
      },
    });
    return this;
  }
}

export namespace MartiniTerrainLoader {
  interface MartiniTerrainOpts {
    url: string | Resource;
    ellipsoid?: Ellipsoid;
    detailScalar?: number;
    minimumErrorLevel?: number;
    maxWorkers?: number;
    interval?: number;
    offset?: number;
    minZoomLevel?: number;
    fillPoles?: boolean;
    requestVertexNormals?: boolean;
    requestWaterMask?: boolean;
  }

  type DataWithMethod<T extends string, U extends Record<string, any>> = {
    type: T;
  } & U;
  export interface Loaders {
    martini: (
      data: DataWithMethod<"martini", MartiniTerrainOpts>,
    ) => MartiniTerrainProvider;
  }
}
