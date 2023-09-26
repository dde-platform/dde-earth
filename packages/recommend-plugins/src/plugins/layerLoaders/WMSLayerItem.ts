import { WebMapServiceImageryProvider } from 'cesium';
import { LayerManager } from 'dde-earth';

import { RasterLayerItem } from './RasterLayerItem';

export class WMSLayerItem extends RasterLayerItem<WMSLayerItem.Data> {
  async init(data: WMSLayerItem.Data) {
    const imageryProvider = new WebMapServiceImageryProvider(data);
    const layer =
      this.earth.viewer.imageryLayers.addImageryProvider(imageryProvider);
    return layer;
  }
}

export namespace WMSLayerItem {
  export type Method = 'wms';

  export type RenderOptions = RasterLayerItem.RenderOptions;

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> &
    WebMapServiceImageryProvider.ConstructorOptions;
}
