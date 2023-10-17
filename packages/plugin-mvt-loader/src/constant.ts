import type { MVTLayerItem } from './MVTLayerItem';

export const basicRenderOptions: MVTLayerItem.BasicRenderOptions = {
  brightness: 1,
  alpha: 1,
  gamma: 1,
  saturation: 1,
  contrast: 1,
  hue: 0,
};

export const defaultRenderOptions: MVTLayerItem.RenderOptions = {
  ...basicRenderOptions,
};
