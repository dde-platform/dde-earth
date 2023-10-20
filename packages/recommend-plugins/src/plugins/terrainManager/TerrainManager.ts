import { BasePlugin } from 'dde-earth';

import type { Earth } from 'dde-earth';

export class TerrainManager extends BasePlugin {
  name = 'TerrainManager';

  init(earth: Earth) {
    this._init(earth);
    return this;
  }
}
