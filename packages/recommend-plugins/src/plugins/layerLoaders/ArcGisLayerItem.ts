import { ArcGisMapServerImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

import type { Resource } from "cesium";

export class ArcGisLayerItem extends RasterLayerItem<ArcGisLayerItem.Data> {
  async init(data: ArcGisLayerItem.Data) {
    const imageryProvider = await ArcGisMapServerImageryProvider.fromUrl(
      data.url,
      this.handleData(data),
    );
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace ArcGisLayerItem {
  export type Method = "arcgis";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = RasterLayerItem.Data<Method, RenderOptions> &
    ArcGisMapServerImageryProvider.ConstructorOptions & {
      url: Resource | string;
    };
}
