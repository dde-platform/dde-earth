import { Earth } from 'dde-earth';

import { WMSLayerItem } from './WMSLayerItem';

declare module 'dde-earth' {
  namespace LayerManager {
    interface Loaders {
      wms: (earth: Earth, data: WMSLayerItem.Data) => Promise<WMSLayerItem>;
    }
  }
}
