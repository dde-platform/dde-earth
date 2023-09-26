import { BasePlugin, Earth } from 'dde-earth';

import './api';

export class LayerLoaders extends BasePlugin {
  readonly name = 'LayerLoaders';

  constructor(options?: BasePlugin.Options) {
    super(options);
  }

  init(earth: Earth) {
    this._init(earth);
    this.earth.layerManager.addLoader({
      wms: async (earth: Earth, data: any) => {
        const { WMSLayerItem } = await import('./WMSLayerItem');
        return new WMSLayerItem(earth, data);
      },
    });
    return this;
  }
}
