import { Color, HeightReference } from "cesium";

import type { DrawerStyleOptions, DrawerTips } from "../types";

/**
 * 默认提示信息配置（国际化）
 */
export const DEFAULT_TIPS: Record<string, DrawerTips> = {
  "zh-CN": {
    init: "点击开始绘制",
    bindPoint: "左键添加点，右键撤销上一点",
    bindLastPoint: "双击完成绘制",
  },
  "en-US": {
    init: "Click to start drawing",
    bindPoint: "Left click to add point, right click to undo",
    bindLastPoint: "Double click to finish",
  },
};

/**
 * 专业 GIS 风格主色调（金黄色 - 高可见度）
 */
const PRIMARY_COLOR = "#FFD700"; // Gold

/**
 * 默认点样式 - 专业 GIS 风格
 * 金黄色实心点 + 黑色轮廓，高可见度
 */
export const DEFAULT_POINT_STYLE = {
  pixelSize: 8,
  color: Color.fromCssColorString(PRIMARY_COLOR),
  outlineColor: Color.BLACK,
  outlineWidth: 1,
  heightReference: HeightReference.CLAMP_TO_GROUND,
  disableDepthTestDistance: Number.POSITIVE_INFINITY,
};

/**
 * 默认线样式 - 专业 GIS 风格
 * 金黄色半透明线条
 */
export const DEFAULT_POLYLINE_STYLE = {
  width: 3,
  material: Color.fromCssColorString(PRIMARY_COLOR).withAlpha(0.8),
  clampToGround: true,
};

/**
 * 默认面样式 - 专业 GIS 风格
 * 低透明度填充 + 金黄色边框
 */
export const DEFAULT_POLYGON_STYLE = {
  material: Color.fromCssColorString(PRIMARY_COLOR).withAlpha(0.15),
  outline: true,
  outlineColor: Color.fromCssColorString(PRIMARY_COLOR),
  outlineWidth: 2,
  heightReference: HeightReference.CLAMP_TO_GROUND,
};

/**
 * 默认圆形样式 - 专业 GIS 风格
 * 低透明度填充 + 金黄色边框
 */
export const DEFAULT_ELLIPSE_STYLE = {
  material: Color.fromCssColorString(PRIMARY_COLOR).withAlpha(0.15),
  outline: true,
  outlineColor: Color.fromCssColorString(PRIMARY_COLOR),
  outlineWidth: 2,
  heightReference: HeightReference.CLAMP_TO_GROUND,
};

/**
 * 获取默认样式配置
 */
export function getDefaultStyle(): DrawerStyleOptions {
  return {
    point: { ...DEFAULT_POINT_STYLE },
    polyline: { ...DEFAULT_POLYLINE_STYLE },
    polygon: { ...DEFAULT_POLYGON_STYLE },
    ellipse: { ...DEFAULT_ELLIPSE_STYLE },
  };
}

/**
 * 获取默认提示信息
 * @param locale 语言代码，默认 zh-CN
 */
export function getDefaultTips(locale = "zh-CN"): DrawerTips {
  return DEFAULT_TIPS[locale] || DEFAULT_TIPS["zh-CN"];
}

/**
 * 合并样式配置
 */
export function mergeStyle(
  defaultStyle: DrawerStyleOptions,
  customStyle?: DrawerStyleOptions,
): DrawerStyleOptions {
  if (!customStyle) return defaultStyle;

  return {
    point: customStyle.point
      ? { ...defaultStyle.point, ...customStyle.point }
      : defaultStyle.point,
    polyline: customStyle.polyline
      ? { ...defaultStyle.polyline, ...customStyle.polyline }
      : defaultStyle.polyline,
    polygon: customStyle.polygon
      ? { ...defaultStyle.polygon, ...customStyle.polygon }
      : defaultStyle.polygon,
    ellipse: customStyle.ellipse
      ? { ...defaultStyle.ellipse, ...customStyle.ellipse }
      : defaultStyle.ellipse,
  };
}
