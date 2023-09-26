import { WMSLayerItem } from './WMSLayerItem';

declare module 'dde-earth' {
  export namespace LayerManager {
    export interface Loaders {
      wms: (earth: Earth, data: WMSLayerItem.Data) => Promise<WMSLayerItem>;
    }
  }
}
