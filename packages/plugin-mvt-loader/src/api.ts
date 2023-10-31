import type { MVTLayerLoader } from ".";

declare module "dde-earth" {
  namespace LayerManager {
    interface Loaders extends MVTLayerLoader.Loaders {}
  }
}
