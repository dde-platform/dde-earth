import type { AmapLayerLoader } from "./AmapLayerLoader";

declare module "dde-earth" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace LayerManager {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Loaders extends AmapLayerLoader.Loaders {}
  }
}
