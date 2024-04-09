import { Earth } from "dde-earth";

import { LayerSwitcher } from "./LayerSwitcher";

import type { LayerItem } from "dde-earth";

declare module "dde-earth" {
  interface Earth {
    moveLayer: (
      targetLayer: LayerItem,
      sourceLayer: LayerItem,
    ) => boolean | undefined;
  }

  namespace Earth {
    interface Events {
      "layer:move": [
        info: {
          targetLayer: LayerItem;
          sourceLayer: LayerItem;
          targetIndex: number;
          sourceIndex: number;
          layerList: LayerItem[];
        },
      ];
    }
  }
}

Earth.prototype.moveLayer = function (
  sourceLayer: LayerItem,
  targetLayer: LayerItem,
): boolean {
  const layerSwitcher = this.getPlugin<LayerSwitcher>(LayerSwitcher);
  if (!layerSwitcher) return false;
  return layerSwitcher.moveLayer(sourceLayer, targetLayer);
};
