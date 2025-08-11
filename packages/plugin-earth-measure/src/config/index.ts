import {
  Color,
  EllipseGraphics,
  HeightReference,
  PointGraphics,
  PolygonGraphics,
  PolylineGraphics,
  RectangleGraphics,
} from "cesium";

import { MeasureOptions } from "../types";

export const DEFAULT_DRAWER_GRAPH_OPTIONS = {
  POINT: {
    pixelSize: 8,
    color: Color.fromCssColorString("#ff8800"),
    outlineColor: Color.WHITE,
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  } as PointGraphics.ConstructorOptions,
  POLYLINE: {
    width: 3,
    material: Color.fromCssColorString("#ff8800"),
    clampToGround: true,
  } as PolylineGraphics.ConstructorOptions,
  POLYGON: {
    material: Color.fromCssColorString("#ff8800").withAlpha(0.3),
    outline: true,
    outlineColor: Color.fromCssColorString("#ff8800"),
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  } as PolygonGraphics.ConstructorOptions,
  CIRCLE: {
    material: Color.fromCssColorString("#ff8800").withAlpha(0.3),
    outline: true,
    outlineColor: Color.fromCssColorString("#ff8800"),
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  } as EllipseGraphics.ConstructorOptions,
  RECTANGLE: {
    material: Color.fromCssColorString("#ff8800").withAlpha(0.3),
    outline: true,
    outlineColor: Color.fromCssColorString("#ff8800"),
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  } as RectangleGraphics.ConstructorOptions,
};

export const DEFAULT_MEASURE_OPTIONS: Record<string, MeasureOptions> = {
  "zh-CN": {
    units: "kilometers", // 默认为kilometers
    locale: {
      start: "起点",
      area: "面积",
      total: "总计",
      formatLength: (length: number, unitedLength: number) => {
        if (length < 1000) {
          return length + "米";
        }
        return unitedLength + "千米";
      },
      formatArea: (area: number, unitedArea: number) => {
        if (area < 1000000) {
          return area + "平方米";
        }
        return unitedArea + "平方千米";
      },
    },
    drawerOptions: {
      tips: {
        init: "点击绘制",
        start: "左键添加点，右键移除点，双击结束绘制",
      },
    },
  },
  "en-US": {
    units: "kilometers", // default is kilometers
    locale: {
      start: "Start",
      area: "Area",
      total: "Total",
      formatLength: (length: number, unitedLength: number) => {
        if (length < 1000) {
          return length + "m";
        }
        return unitedLength + "km";
      },
      formatArea: (area: number, unitedArea: number) => {
        if (area < 1000000) {
          return area + "㎡";
        }
        return unitedArea + "km²";
      },
    },
    drawerOptions: {
      tips: {
        init: "Click to draw",
        start:
          "Left click to add point, right click to remove point, double click to finish drawing",
      },
    },
  },
};
