import { WebMapServiceImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

import type { LayerManager } from "dde-earth";

export class WMSLayerItem extends RasterLayerItem<WMSLayerItem.Data> {
  async init(data: WMSLayerItem.Data) {
    const imageryProvider = new WebMapServiceImageryProvider(data);
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace WMSLayerItem {
  export type Method = "wms";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    WebMapServiceImageryProvider.ConstructorOptions;
}
