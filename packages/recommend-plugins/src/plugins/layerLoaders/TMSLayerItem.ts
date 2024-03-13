import { UrlTemplateImageryProvider } from "cesium";

import { RasterLayerItem } from "./RasterLayerItem";

export class TMSLayerItem extends RasterLayerItem<TMSLayerItem.Data> {
  async _init(data: TMSLayerItem.Data) {
    const imageryProvider = new UrlTemplateImageryProvider(
      this.handleData(data),
    );
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace TMSLayerItem {
  export type Method = "tms";

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = RasterLayerItem.Data<Method, RenderOptions> &
    UrlTemplateImageryProvider.ConstructorOptions;
}
