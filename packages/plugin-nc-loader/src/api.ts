import type { NCLayerLoader } from '.';

declare module 'dde-earth' {
  namespace LayerManager {
    interface Loaders extends NCLayerLoader.Loaders {}
  }
}
