import type { RasterLayerItem } from './RasterLayerItem';

export const DefaultRenderOptions: {
  raster: RasterLayerItem.RenderOptions;
} = {
  raster: {
    brightness: 1,
    alpha: 1,
    gamma: 1,
    saturation: 1,
    contrast: 1,
    hue: 0,
  },
};
