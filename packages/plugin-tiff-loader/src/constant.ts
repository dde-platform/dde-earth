import type { TIFFLayerItem } from "./TIFFLayerItem";

export const basicRenderOptions: TIFFLayerItem.BasicRenderOptions = {
  brightness: 1,
  alpha: 1,
  gamma: 1,
  saturation: 1,
  contrast: 1,
  hue: 0,
};

export const defaultRenderOptions: TIFFLayerItem.RenderOptions = {
  ...basicRenderOptions,
};
