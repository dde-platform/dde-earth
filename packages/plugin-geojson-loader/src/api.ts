import type { GeoJsonLayerLoader } from "./GeoJsonLayerLoader";

declare module "dde-earth" {
  namespace LayerManager {
    interface Loaders extends GeoJsonLayerLoader.Loaders {}
  }
}
