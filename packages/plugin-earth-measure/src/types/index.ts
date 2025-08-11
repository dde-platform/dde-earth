import {
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

export type MeasureLocaleOptions = {
  start: string;
  total: string;
  area: string;
  /**
   * 格式化显示长度
   * @param length 单位米
   * @param unit 目标单位
   */
  formatLength(
    length: number,
    unitedLength: number,
    unit: MeasureUnits,
  ): string;
  /**
   * 格式化显示面积
   * @param area 单位米
   * @param unit 目标单位
   */
  formatArea(area: number, unitedArea: number, unit: MeasureUnits): string;
};

export type MeasureRenderingOptions = {
  polyline?: PolylineGraphics.ConstructorOptions;
  polygon?: PolygonGraphics.ConstructorOptions;
};

export type MeasureOptions = {
  labelStyle?: {
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
  /** defaults to kilometers */
  units?: MeasureUnits;
  onEnd?: (entity: Entity) => void;
  /* drawerOptions: more detailed type could be found in @cesium-extends/drawer */
  drawerOptions?: {
    // dynamicGraphicsOptions?: {
    //   POINT: PointGraphics.ConstructorOptions;
    //   POLYLINE: PolylineGraphics.ConstructorOptions;
    //   POLYGON: PolygonGraphics.ConstructorOptions;
    //   CIRCLE: EllipseGraphics.ConstructorOptions;
    //   RECTANGLE: RectangleGraphics.ConstructorOptions;
    // };
    tips?: {
      init: string;
      start: string;
    };
  };
  /**
   * @example 
   * {
        start: '起点',
        area: '面积',
        total: '总计',
        formatLength: (length, unitedLength) => {
          if (length < 1000) {
            return length + '米';
          }
          return unitedLength + '千米';
        },
        formatArea: (area, unitedArea) => {
          if (area < 1000000) {
            return area + '平方米';
          }
          return unitedArea + '平方千米';
        }
      }
   */
  locale?: Partial<MeasureLocaleOptions>;
  renderingOptions?: MeasureRenderingOptions;
};
