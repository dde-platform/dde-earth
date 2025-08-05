/* eslint-disable @typescript-eslint/no-namespace */
import CesiumGraticule from "cesium-graticule";
import { BasePlugin } from "dde-earth";

import type { GraticulesOptions } from "cesium-graticule";
import type { Earth } from "dde-earth";

export class Graticule extends BasePlugin {
  name = "Graticule";
  graticule!: CesiumGraticule;

  hide() {
    this.graticule.hide();
  }

  show() {
    this.graticule.show();
  }

  init(earth: Earth, options?: Graticule.Options) {
    this._init(earth);
    this.graticule = new CesiumGraticule(earth.viewer, options?.graticule);
    return this;
  }

  destroy(): void {
    this.graticule.destory();
  }
}

export namespace Graticule {
  export type Options = {
    graticule?: GraticulesOptions;
  };
}
