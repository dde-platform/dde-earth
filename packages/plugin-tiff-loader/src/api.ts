import { TIFFLayerLoader } from '.';

declare module 'dde-earth' {
  namespace LayerManager {
    interface Loaders extends TIFFLayerLoader.Loaders {}
  }
}
