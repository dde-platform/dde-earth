import { WebMapTileServiceImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

export class WMTSLayerItem extends RasterLayerItem<WMTSLayerItem.Data> {
  async _init(data: WMTSLayerItem.Data) {
    const imageryProvider = new WebMapTileServiceImageryProvider(
      this.handleData(data),
    );
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace WMTSLayerItem {
  export type Method = "wmts";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = RasterLayerItem.Data<Method, RenderOptions> &
    WebMapTileServiceImageryProvider.ConstructorOptions;
}
