import type {
  Cartesian3,
  EllipseGraphics,
  Entity,
  PointGraphics,
  PolygonGraphics,
  PolylineGraphics,
  Viewer,
} from "cesium";

/**
 * 绘图类型
 */
export type DrawerType = "point" | "line" | "polygon" | "rectangle" | "circle";

/**
 * 绘图状态
 */
export type DrawerStatus = "idle" | "drawing" | "bindPoint" | "bindLastPoint";

/**
 * 提示信息配置
 */
export interface DrawerTips {
  /** 初始提示 */
  init: string;
  /** 绑定点时的提示 */
  bindPoint: string;
  /** 绑定最后一个点时的提示 */
  bindLastPoint: string;
}

/**
 * 绘图样式配置
 */
export interface DrawerStyleOptions {
  /** 点样式 */
  point?: PointGraphics.ConstructorOptions;
  /** 线样式 */
  polyline?: PolylineGraphics.ConstructorOptions;
  /** 面样式 */
  polygon?: PolygonGraphics.ConstructorOptions;
  /** 圆形/椭圆样式 */
  ellipse?: EllipseGraphics.ConstructorOptions;
}

/**
 * 绘图结果
 */
export interface DrawResult {
  /** 绘制的实体 */
  entity: Entity;
  /** 绘制的坐标点 */
  positions: Cartesian3[];
  /** 绘图类型 */
  type: DrawerType;
  /** 圆形半径（仅圆形时有值） */
  radius?: number;
  /** 边线实体（多边形/矩形时有值） */
  outlineEntity?: Entity;
}

/**
 * 直接绘制参数 - 点
 */
export interface DrawByPositionsPointOptions {
  /** 点坐标 */
  position: Cartesian3;
}

/**
 * 直接绘制参数 - 线
 */
export interface DrawByPositionsLineOptions {
  /** 线坐标点数组（至少2个点） */
  positions: Cartesian3[];
}

/**
 * 直接绘制参数 - 多边形
 */
export interface DrawByPositionsPolygonOptions {
  /** 多边形顶点坐标数组（至少3个点） */
  positions: Cartesian3[];
}

/**
 * 直接绘制参数 - 矩形
 */
export interface DrawByPositionsRectangleOptions {
  /** 矩形对角点坐标（2个点） */
  positions: [Cartesian3, Cartesian3];
}

/**
 * 直接绘制参数 - 圆形
 */
export interface DrawByPositionsCircleOptions {
  /** 圆心坐标 */
  center: Cartesian3;
  /** 半径（米）或边缘点坐标 */
  radius: number | Cartesian3;
}

/**
 * 绘图选项
 */
export interface DrawerOptions {
  /** 绘制完成回调 */
  onComplete?: (result: DrawResult) => void;
  /** 绘制取消回调 */
  onCancel?: () => void;
  /** 点添加回调 */
  onPointAdd?: (position: Cartesian3, index: number) => void;
  /** 点移除回调 */
  onPointRemove?: (position: Cartesian3, index: number) => void;
  /** 样式配置 */
  style?: DrawerStyleOptions;
  /** 提示信息配置 */
  tips?: Partial<DrawerTips>;
  /** 是否显示提示 */
  showTips?: boolean;
  /** 是否在绘制完成后保留图形 */
  keepAfterComplete?: boolean;
}

/**
 * 基础绘图器配置
 */
export interface BaseDrawerConfig {
  /** Cesium Viewer 实例 */
  viewer: Viewer;
  /** 绘图选项 */
  options?: DrawerOptions;
  /** 提示信息 */
  tips?: DrawerTips;
}

/**
 * 绘图器事件类型
 */
export type DrawerEventType =
  | "start"
  | "bindPoint"
  | "bindLastPoint"
  | "complete"
  | "cancel"
  | "pointAdd"
  | "pointRemove";

/**
 * 绘图器事件回调
 */
export interface DrawerEventCallbacks {
  start?: () => void;
  bindPoint?: (position: Cartesian3) => void;
  bindLastPoint?: (position: Cartesian3) => void;
  complete?: (result: DrawResult) => void;
  cancel?: () => void;
  pointAdd?: (position: Cartesian3, index: number) => void;
  pointRemove?: (position: Cartesian3, index: number) => void;
}

/**
 * Drawer 插件配置选项
 * 在插件注册时传入，用于自定义默认行为
 */
export interface DrawerPluginOptions {
  /** 默认样式配置，会与内置默认样式合并 */
  style?: DrawerStyleOptions;
  /** 是否显示绘制提示，默认 true */
  showTips?: boolean;
}
