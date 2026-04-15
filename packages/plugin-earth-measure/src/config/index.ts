import {
  Cartesian2,
  Color,
  HeightReference,
  LabelStyle,
  NearFarScalar,
} from "cesium";

import type {
  MeasureLabelStyle,
  MeasureLocaleOptions,
  MeasureOptions,
} from "../types";

export const DEFAULT_DRAWER_GRAPH_OPTIONS = {
  POINT: {
    pixelSize: 8,
    color: Color.fromCssColorString("#ff8800"),
    outlineColor: Color.WHITE,
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  },
  POLYLINE: {
    width: 3,
    material: Color.fromCssColorString("#ff8800"),
    clampToGround: true,
  },
  POLYGON: {
    material: Color.fromCssColorString("#ff8800").withAlpha(0.3),
    outline: true,
    outlineColor: Color.fromCssColorString("#ff8800"),
    outlineWidth: 2,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  },
} as const;

export const DEFAULT_LABEL_STYLE: MeasureLabelStyle = {
  font: "bold 20px Arial",
  fillColor: Color.WHITE,
  backgroundColor: new Color(0.165, 0.165, 0.165, 0.8),
  backgroundPadding: new Cartesian2(4, 4),
  outlineWidth: 4,
  style: LabelStyle.FILL_AND_OUTLINE,
  pixelOffset: new Cartesian2(4, 0),
  scale: 1,
  scaleByDistance: new NearFarScalar(1, 0.85, 8000000, 0.75),
  heightReference: HeightReference.CLAMP_TO_GROUND,
};

const zhCNLocale: MeasureLocaleOptions = {
  start: "起点",
  area: "面积",
  total: "总计",
  formatLength: (length: number, unitedLength: number) => {
    if (length < 1000) {
      return `${length}米`;
    }
    return `${unitedLength}千米`;
  },
  formatArea: (area: number, unitedArea: number) => {
    if (area < 1000000) {
      return `${area}平方米`;
    }
    return `${unitedArea}平方千米`;
  },
};

const enUSLocale: MeasureLocaleOptions = {
  start: "Start",
  area: "Area",
  total: "Total",
  formatLength: (length: number, unitedLength: number) => {
    if (length < 1000) {
      return `${length}m`;
    }
    return `${unitedLength}km`;
  },
  formatArea: (area: number, unitedArea: number) => {
    if (area < 1000000) {
      return `${area}m2`;
    }
    return `${unitedArea}km2`;
  },
};

export const DEFAULT_MEASURE_OPTIONS: Record<string, MeasureOptions> = {
  "zh-CN": {
    units: "kilometers",
    labelStyle: { ...DEFAULT_LABEL_STYLE },
    locale: zhCNLocale,
    drawerOptions: {
      tips: {
        init: "点击开始测量",
        start: "左键添加点，右键移除点，双击结束",
      },
    },
  },
  "en-US": {
    units: "kilometers",
    labelStyle: { ...DEFAULT_LABEL_STYLE },
    locale: enUSLocale,
    drawerOptions: {
      tips: {
        init: "Click to start measuring",
        start:
          "Left click add point, right click remove point, double click finish",
      },
    },
  },
};
