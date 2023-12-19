import { WebMapServiceImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

export class WMSLayerItem extends RasterLayerItem<WMSLayerItem.Data> {
  async init(data: WMSLayerItem.Data) {
    const newData = this.handleData(data);
    const imageryProvider = new WebMapServiceImageryProvider({
      ...newData,
      parameters: {
        format: "image/png",
        transparent: true,
        ...newData.parameters,
      },
    });
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace WMSLayerItem {
  export type Method = "wms";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = RasterLayerItem.Data<Method, RenderOptions> &
    WebMapServiceImageryProvider.ConstructorOptions;
}
