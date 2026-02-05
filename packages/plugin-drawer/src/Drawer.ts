import { BasePlugin } from "dde-earth";

import { getDefaultStyle, getDefaultTips, mergeStyle } from "./config";
import {
  CircleDrawer,
  PointDrawer,
  PolygonDrawer,
  PolylineDrawer,
  RectangleDrawer,
} from "./drawers";

import type { Cartesian3, Entity } from "cesium";
import type { Earth } from "dde-earth";
import type { BaseDrawer } from "./drawers";
import type {
  DrawByPositionsCircleOptions,
  DrawByPositionsLineOptions,
  DrawByPositionsPointOptions,
  DrawByPositionsPolygonOptions,
  DrawByPositionsRectangleOptions,
  DrawResult,
  DrawerOptions,
  DrawerPluginOptions,
  DrawerStyleOptions,
  DrawerTips,
  DrawerType,
} from "./types";

/**
 * Cesium 绘图插件
 *
 * 支持点、线、多边形、矩形、圆形的绘制
 *
 * @example
 * ```typescript
 * const drawer = earth.usePlugin(new Drawer());
 *
 * // 开始绘制多边形
 * drawer.startDraw("polygon", {
 *   onComplete: (result) => {
 *     console.log("绘制完成", result);
 *   },
 * });
 *
 * // 停止绘制
 * drawer.stopDraw();
 *
 * // 清除所有绘制
 * drawer.clear();
 * ```
 */
export class Drawer extends BasePlugin {
  readonly name = "Drawer";

  /** 当前绘图器 */
  private _currentDrawer: BaseDrawer | null = null;

  /** 已绘制的实体列表 */
  private _drawnEntities: Entity[] = [];

  /** 实体与边线实体的映射关系 */
  private _outlineEntityMap: Map<Entity, Entity> = new Map();

  /** 当前绘图类型 */
  private _currentType: DrawerType | null = null;

  /** 提示信息配置 */
  private _tips: DrawerTips;

  /** 语言切换处理函数 */
  private _langChangeHandler: (() => void) | null = null;

  /** 默认样式配置 */
  private _defaultStyle: DrawerStyleOptions;

  /** 是否显示提示 */
  private _showTips: boolean;

  /**
   * 获取当前绘图类型
   */
  get currentType(): DrawerType | null {
    return this._currentType;
  }

  /**
   * 是否正在绘制
   */
  get isDrawing(): boolean {
    return this._currentDrawer !== null;
  }

  /**
   * 获取已绘制的实体列表
   */
  get drawnEntities(): Entity[] {
    return [...this._drawnEntities];
  }

  /**
   * 获取当前默认样式配置
   */
  get defaultStyle(): DrawerStyleOptions {
    return this._defaultStyle;
  }

  /**
   * @param options 插件配置选项
   */
  constructor(options?: DrawerPluginOptions) {
    super();
    this._tips = getDefaultTips();
    // 合并用户配置的样式与默认样式
    this._defaultStyle = mergeStyle(getDefaultStyle(), options?.style);
    this._showTips = options?.showTips ?? true;
  }

  /**
   * 初始化插件
   */
  init(earth: Earth): this {
    this._init(earth);

    // 根据当前语言获取提示信息
    this._tips = getDefaultTips(earth.i18n.locale);

    // 监听语言切换事件
    this._langChangeHandler = () => {
      this._tips = getDefaultTips(this.earth.i18n.locale);
    };
    earth.on("lang:change", this._langChangeHandler);

    return this;
  }

  /**
   * 开始绘制
   * @param type 绘图类型
   * @param options 绘图选项
   */
  startDraw(type: DrawerType, options?: DrawerOptions): void {
    // 如果正在绘制，先停止
    if (this._currentDrawer) {
      this.stopDraw();
    }

    this._currentType = type;

    // 合并样式：插件默认样式 + 调用时传入的样式
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);

    // 创建对应的绘图器
    const config = {
      viewer: this.viewer,
      options: {
        ...options,
        style: mergedStyle,
        showTips: options?.showTips ?? this._showTips,
        keepAfterComplete: true, // 默认保留绘制结果
        onComplete: (result: DrawResult) => {
          // 保存绘制的实体
          if (result.entity) {
            this._drawnEntities.push(result.entity);
            // 保存边线实体的映射关系
            if (result.outlineEntity) {
              this._outlineEntityMap.set(result.entity, result.outlineEntity);
            }
          }
          // 重置当前绘图器
          this._currentDrawer = null;
          this._currentType = null;
          // 调用用户回调
          options?.onComplete?.(result);
        },
        onCancel: () => {
          this._currentDrawer = null;
          this._currentType = null;
          options?.onCancel?.();
        },
      },
      tips: this._tips,
    };

    switch (type) {
      case "point":
        this._currentDrawer = new PointDrawer(config);
        break;
      case "line":
        this._currentDrawer = new PolylineDrawer(config);
        break;
      case "polygon":
        this._currentDrawer = new PolygonDrawer(config);
        break;
      case "rectangle":
        this._currentDrawer = new RectangleDrawer(config);
        break;
      case "circle":
        this._currentDrawer = new CircleDrawer(config);
        break;
      default:
        console.warn(`Unknown drawer type: ${type}`);
        return;
    }

    // 开始绘制
    this._currentDrawer.start();
  }

  /**
   * 停止当前绘制
   */
  stopDraw(): void {
    if (this._currentDrawer) {
      this._currentDrawer.stop();
      this._currentDrawer = null;
      this._currentType = null;
    }
  }

  /**
   * 清除所有绘制的图形
   */
  clear(): void {
    // 停止当前绘制
    this.stopDraw();

    // 移除所有已绘制的实体及其边线
    for (const entity of this._drawnEntities) {
      // 移除边线实体
      const outlineEntity = this._outlineEntityMap.get(entity);
      if (outlineEntity && this.viewer.entities.contains(outlineEntity)) {
        this.viewer.entities.remove(outlineEntity);
      }
      // 移除主实体
      if (this.viewer.entities.contains(entity)) {
        this.viewer.entities.remove(entity);
      }
    }
    this._drawnEntities = [];
    this._outlineEntityMap.clear();

    // 请求渲染
    this.viewer.scene.requestRender();
  }

  /**
   * 移除指定实体
   * @param entity 要移除的实体
   */
  removeEntity(entity: Entity): boolean {
    const index = this._drawnEntities.indexOf(entity);
    if (index !== -1) {
      this._drawnEntities.splice(index, 1);

      // 移除边线实体
      const outlineEntity = this._outlineEntityMap.get(entity);
      if (outlineEntity && this.viewer.entities.contains(outlineEntity)) {
        this.viewer.entities.remove(outlineEntity);
      }
      this._outlineEntityMap.delete(entity);

      // 移除主实体
      if (this.viewer.entities.contains(entity)) {
        this.viewer.entities.remove(entity);
      }

      this.viewer.scene.requestRender();
      return true;
    }
    return false;
  }

  /**
   * 移除最后一个绘制的实体
   */
  removeLastEntity(): Entity | null {
    const entity = this._drawnEntities.pop();
    if (entity) {
      // 移除边线实体
      const outlineEntity = this._outlineEntityMap.get(entity);
      if (outlineEntity && this.viewer.entities.contains(outlineEntity)) {
        this.viewer.entities.remove(outlineEntity);
      }
      this._outlineEntityMap.delete(entity);

      // 移除主实体
      if (this.viewer.entities.contains(entity)) {
        this.viewer.entities.remove(entity);
      }

      this.viewer.scene.requestRender();
      return entity;
    }
    return null;
  }

  /**
   * 获取当前绘图器
   */
  getCurrentDrawer(): BaseDrawer | null {
    return this._currentDrawer;
  }

  // ===== 通过坐标直接绘制的便捷方法 =====

  /**
   * 通过坐标直接绘制点
   * @param position 点坐标
   * @param options 绘图选项
   * @returns 绘制结果
   */
  drawPoint(position: Cartesian3, options?: DrawerOptions): DrawResult | null {
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);
    const drawer = new PointDrawer({
      viewer: this.viewer,
      options: { ...options, style: mergedStyle },
      tips: this._tips,
    });

    const result = drawer.drawByPositions({ position });

    // 保存绘制的实体
    if (result?.entity) {
      this._drawnEntities.push(result.entity);
    }

    return result;
  }

  /**
   * 通过坐标直接绘制线
   * @param positions 线坐标点数组（至少2个点）
   * @param options 绘图选项
   * @returns 绘制结果
   */
  drawLine(
    positions: Cartesian3[],
    options?: DrawerOptions,
  ): DrawResult | null {
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);
    const drawer = new PolylineDrawer({
      viewer: this.viewer,
      options: { ...options, style: mergedStyle },
      tips: this._tips,
    });

    const result = drawer.drawByPositions({ positions });

    // 保存绘制的实体
    if (result?.entity) {
      this._drawnEntities.push(result.entity);
    }

    return result;
  }

  /**
   * 通过坐标直接绘制多边形
   * @param positions 多边形顶点坐标数组（至少3个点）
   * @param options 绘图选项
   * @returns 绘制结果
   */
  drawPolygon(
    positions: Cartesian3[],
    options?: DrawerOptions,
  ): DrawResult | null {
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);
    const drawer = new PolygonDrawer({
      viewer: this.viewer,
      options: { ...options, style: mergedStyle },
      tips: this._tips,
    });

    const result = drawer.drawByPositions({ positions });

    // 保存绘制的实体
    if (result?.entity) {
      this._drawnEntities.push(result.entity);
      // 保存边线实体的映射关系
      if (result.outlineEntity) {
        this._outlineEntityMap.set(result.entity, result.outlineEntity);
      }
    }

    return result;
  }

  /**
   * 通过坐标直接绘制矩形
   * @param positions 矩形对角点坐标（2个点）
   * @param options 绘图选项
   * @returns 绘制结果
   */
  drawRectangle(
    positions: [Cartesian3, Cartesian3],
    options?: DrawerOptions,
  ): DrawResult | null {
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);
    const drawer = new RectangleDrawer({
      viewer: this.viewer,
      options: { ...options, style: mergedStyle },
      tips: this._tips,
    });

    const result = drawer.drawByPositions({ positions });

    // 保存绘制的实体
    if (result?.entity) {
      this._drawnEntities.push(result.entity);
      // 保存边线实体的映射关系
      if (result.outlineEntity) {
        this._outlineEntityMap.set(result.entity, result.outlineEntity);
      }
    }

    return result;
  }

  /**
   * 通过坐标直接绘制圆形
   * @param center 圆心坐标
   * @param radius 半径（米）或边缘点坐标
   * @param options 绘图选项
   * @returns 绘制结果
   */
  drawCircle(
    center: Cartesian3,
    radius: number | Cartesian3,
    options?: DrawerOptions,
  ): DrawResult | null {
    const mergedStyle = mergeStyle(this._defaultStyle, options?.style);
    const drawer = new CircleDrawer({
      viewer: this.viewer,
      options: { ...options, style: mergedStyle },
      tips: this._tips,
    });

    const result = drawer.drawByPositions({ center, radius });

    // 保存绘制的实体
    if (result?.entity) {
      this._drawnEntities.push(result.entity);
    }

    return result;
  }

  /**
   * 销毁插件
   */
  destroy(): void {
    // 停止绘制并清除
    this.clear();

    // 移除语言切换监听
    if (this._langChangeHandler) {
      this.earth.off("lang:change", this._langChangeHandler);
      this._langChangeHandler = null;
    }

    // 调用父类销毁
    super.destroy();
  }
}

// 命名空间，用于类型导出
export namespace Drawer {
  export type Type = DrawerType;
  export type Options = DrawerOptions;
  export type Result = DrawResult;
  export type PluginOptions = DrawerPluginOptions;
  export type StyleOptions = DrawerStyleOptions;
}
