/* eslint-disable @typescript-eslint/no-namespace */
import { SingleTileImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

export class PICLayerItem extends RasterLayerItem<PICLayerItem.Data> {
  async init(data: PICLayerItem.Data) {
    const imageryProvider = new SingleTileImageryProvider(data);
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace PICLayerItem {
  export type Method = "pic";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = RasterLayerItem.Data<Method, RenderOptions> &
    SingleTileImageryProvider.ConstructorOptions;
}
