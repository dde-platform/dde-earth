import type {
  Cartesian2,
  Color,
  Entity,
  HeightReference,
  LabelStyle,
  NearFarScalar,
  PolygonGraphics,
  PolylineGraphics,
} from "cesium";

export type MeasureUnits =
  | "meters"
  | "millimeters"
  | "centimeters"
  | "kilometers"
  | "acres"
  | "miles"
  | "nauticalmiles"
  | "inches"
  | "yards"
  | "feet"
  | "radians"
  | "degrees"
  | "hectares";

export type MeasureType =
  | "distance"
  | "distanceSurface"
  | "area"
  | "areaSurface";

export type MeasureLocaleOptions = {
  start: string;
  total: string;
  area: string;
  /**
   * 格式化长度显示文本
   * @param length 原始长度，单位米
   * @param unitedLength 按目标单位转换后的值
   * @param unit 目标单位
   */
  formatLength(
    length: number,
    unitedLength: number,
    unit: MeasureUnits,
  ): string;
  /**
   * 格式化面积显示文本
   * @param area 原始面积，单位平方米
   * @param unitedArea 按目标单位转换后的值
   * @param unit 目标单位
   */
  formatArea(area: number, unitedArea: number, unit: MeasureUnits): string;
};

export type MeasureLabelStyle = {
  font?: string;
  fillColor?: Color;
  backgroundColor?: Color;
  backgroundPadding?: Cartesian2;
  outlineWidth?: number;
  style?: LabelStyle;
  pixelOffset?: Cartesian2;
  scale?: number;
  scaleByDistance?: NearFarScalar;
  heightReference?: HeightReference;
};

export type MeasureRenderingOptions = {
  polyline?: PolylineGraphics.ConstructorOptions;
  polygon?: PolygonGraphics.ConstructorOptions;
};

export type MeasureDrawerTips = {
  init: string;
  start: string;
};

export type MeasureOptions = {
  labelStyle?: MeasureLabelStyle;
  /** defaults to kilometers */
  units?: MeasureUnits;
  onEnd?: (entity: Entity) => void;
  drawerOptions?: {
    tips?: Partial<MeasureDrawerTips>;
  };
  locale?: Partial<MeasureLocaleOptions>;
  renderingOptions?: MeasureRenderingOptions;
};

export type ResolvedMeasureOptions = {
  labelStyle: MeasureLabelStyle;
  units: MeasureUnits;
  onEnd?: (entity: Entity) => void;
  drawerOptions: {
    tips: MeasureDrawerTips;
  };
  locale: MeasureLocaleOptions;
  renderingOptions: MeasureRenderingOptions;
};

export interface MeasureTool {
  readonly type: MeasureType;
  start(): void;
  end(): void;
  destroy(): void;
}
