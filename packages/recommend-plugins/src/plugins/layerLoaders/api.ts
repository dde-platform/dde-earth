import { LayerLoaders } from '.';

declare module 'dde-earth' {
  namespace LayerManager {
    interface Loaders extends LayerLoaders.Loaders {}
  }
}
