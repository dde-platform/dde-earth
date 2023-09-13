import { Viewer } from 'cesium';

export type EarthOptions = {
  /** plugins list */
  plugins?: Plugin[];
  /**
   * scene background color
   * @default'#00000099'
   */
  backgroundColor?: string;
  /**
   * globe base color
   * @default'#4F4F4F'
   */
  baseColor?: string;
  /**
   * default viewport
   * @default[116.3, 39.9, 20000000]
   */
  defaultViewPort?: number[];
} & Viewer.ConstructorOptions;
