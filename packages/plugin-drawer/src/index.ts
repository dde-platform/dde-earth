// 主插件类
export { Drawer } from "./Drawer";

// 绘图器类
export {
  BaseDrawer,
  PointDrawer,
  PolylineDrawer,
  PolygonDrawer,
  RectangleDrawer,
  CircleDrawer,
} from "./drawers";

// 类型导出
export type {
  DrawerType,
  DrawerStatus,
  DrawerTips,
  DrawerStyleOptions,
  DrawResult,
  DrawerOptions,
  DrawerPluginOptions,
  BaseDrawerConfig,
  DrawerEventType,
  DrawerEventCallbacks,
  // 直接绘制参数类型
  DrawByPositionsPointOptions,
  DrawByPositionsLineOptions,
  DrawByPositionsPolygonOptions,
  DrawByPositionsRectangleOptions,
  DrawByPositionsCircleOptions,
} from "./types";

// 配置导出
export {
  DEFAULT_TIPS,
  DEFAULT_POINT_STYLE,
  DEFAULT_POLYLINE_STYLE,
  DEFAULT_POLYGON_STYLE,
  DEFAULT_ELLIPSE_STYLE,
  getDefaultStyle,
  getDefaultTips,
  mergeStyle,
} from "./config";
