import { ScreenSpaceEventHandler, ScreenSpaceEventType, defined } from "cesium";

import { getDefaultStyle, getDefaultTips, mergeStyle } from "../config";

import type { Cartesian2, Cartesian3, Entity, Viewer } from "cesium";
import type {
  BaseDrawerConfig,
  DrawResult,
  DrawerOptions,
  DrawerStatus,
  DrawerStyleOptions,
  DrawerTips,
  DrawerType,
} from "../types";

/**
 * 绘图器基类
 * 提供通用的鼠标事件处理、Entity 管理等功能
 */
export abstract class BaseDrawer {
  /** 绘图类型 */
  abstract readonly type: DrawerType;

  /** Cesium Viewer 实例 */
  protected viewer: Viewer;

  /** 鼠标事件处理器 */
  protected handler: ScreenSpaceEventHandler | null = null;

  /** 当前绘制状态 */
  protected status: DrawerStatus = "idle";

  /** 绘制的坐标点 */
  protected positions: Cartesian3[] = [];

  /** 当前鼠标位置（用于动态预览） */
  protected currentMousePosition: Cartesian3 | null = null;

  /** 绘制的实体 */
  protected entity: Entity | null = null;

  /** 绘图选项 */
  protected options: DrawerOptions;

  /** 样式配置 */
  protected style: DrawerStyleOptions;

  /** 提示信息 */
  protected tips: DrawerTips;

  /** 提示 DOM 元素 */
  protected tipElement: HTMLDivElement | null = null;

  /** 是否已销毁 */
  protected isDestroyed = false;

  constructor(config: BaseDrawerConfig) {
    this.viewer = config.viewer;
    this.options = config.options || {};
    this.tips = config.tips || getDefaultTips();
    this.style = mergeStyle(getDefaultStyle(), this.options.style);

    // 合并自定义提示信息
    if (this.options.tips) {
      this.tips = { ...this.tips, ...this.options.tips };
    }
  }

  /**
   * 开始绘制
   */
  start(): void {
    if (this.isDestroyed) {
      console.warn("Drawer has been destroyed");
      return;
    }

    // 清理之前的状态
    this.clear();

    // 移除 Cesium 内置的双击事件处理（阻止双击后视野锁定到实体）
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );

    // 初始化事件处理器
    this.handler = new ScreenSpaceEventHandler(this.viewer.canvas);
    this.status = "drawing";

    // 注册鼠标事件
    this.bindEvents();

    // 显示提示
    if (this.options.showTips !== false) {
      this.showTip(this.tips.init);
    }

    // 初始化绘制（子类实现）
    this.onStart();
  }

  /**
   * 停止绘制
   */
  stop(): void {
    this.status = "idle";
    this.unbindEvents();
    this.hideTip();

    // 停止绘制回调（子类实现）
    this.onStop();

    // 触发取消回调
    this.options.onCancel?.();
  }

  /**
   * 完成绘制
   */
  protected complete(): void {
    if (this.positions.length === 0) {
      this.stop();
      return;
    }

    this.status = "idle";
    this.unbindEvents();
    this.hideTip();

    // 完成绘制（子类实现）
    this.onComplete();

    // 创建结果
    const result: DrawResult = {
      entity: this.entity!,
      positions: [...this.positions],
      type: this.type,
      outlineEntity: this.getOutlineEntity() ?? undefined,
    };

    // 触发完成回调
    this.options.onComplete?.(result);

    // 是否保留图形
    if (!this.options.keepAfterComplete) {
      // 默认不清除，让调用者决定
    }

    // 请求渲染以显示绘制结果
    this.requestRender();
  }

  /**
   * 获取边线实体（子类可覆盖）
   */
  protected getOutlineEntity(): Entity | null {
    return null;
  }

  /**
   * 清除绘制
   */
  clear(): void {
    // 移除实体
    if (this.entity && this.viewer.entities.contains(this.entity)) {
      this.viewer.entities.remove(this.entity);
    }
    this.entity = null;

    // 清除坐标点
    this.positions = [];
    this.currentMousePosition = null;

    // 清除事件处理器
    this.unbindEvents();

    // 隐藏提示
    this.hideTip();

    // 清除状态
    this.status = "idle";

    // 子类清理（子类实现）
    this.onClear();
  }

  /**
   * 销毁绘图器
   */
  destroy(): void {
    this.clear();
    this.isDestroyed = true;
  }

  /**
   * 绑定鼠标事件
   */
  protected bindEvents(): void {
    if (!this.handler) return;

    // 左键点击
    this.handler.setInputAction(
      this.handleLeftClick.bind(this),
      ScreenSpaceEventType.LEFT_CLICK,
    );

    // 鼠标移动
    this.handler.setInputAction(
      this.handleMouseMove.bind(this),
      ScreenSpaceEventType.MOUSE_MOVE,
    );

    // 右键点击
    this.handler.setInputAction(
      this.handleRightClick.bind(this),
      ScreenSpaceEventType.RIGHT_CLICK,
    );

    // 双击
    this.handler.setInputAction(
      this.handleDoubleClick.bind(this),
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );
  }

  /**
   * 解绑鼠标事件
   */
  protected unbindEvents(): void {
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
  }

  /**
   * 处理左键点击
   */
  protected handleLeftClick(event: { position: Cartesian2 }): void {
    const position = this.getCartesian3FromScreen(event.position);
    if (!position) return;

    this.onLeftClick(position);
  }

  /**
   * 处理鼠标移动
   */
  protected handleMouseMove(event: { endPosition: Cartesian2 }): void {
    const position = this.getCartesian3FromScreen(event.endPosition);
    if (!position) return;

    this.currentMousePosition = position;
    this.onMouseMove(position);

    // 更新提示位置
    if (this.tipElement) {
      this.updateTipPosition(event.endPosition);
    }
  }

  /**
   * 处理右键点击
   */
  protected handleRightClick(event: { position: Cartesian2 }): void {
    const position = this.getCartesian3FromScreen(event.position);
    this.onRightClick(position);
  }

  /**
   * 处理双击
   */
  protected handleDoubleClick(event: { position: Cartesian2 }): void {
    const position = this.getCartesian3FromScreen(event.position);
    this.onDoubleClick(position);
  }

  /**
   * 屏幕坐标转世界坐标
   */
  protected getCartesian3FromScreen(position: Cartesian2): Cartesian3 | null {
    // 优先使用地形拾取
    const ray = this.viewer.camera.getPickRay(position);
    if (!ray) return null;

    const cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
    if (defined(cartesian)) {
      return cartesian;
    }

    // 回退到椭球面拾取
    return (
      this.viewer.camera.pickEllipsoid(
        position,
        this.viewer.scene.globe.ellipsoid,
      ) ?? null
    );
  }

  /**
   * 显示提示
   */
  protected showTip(text: string): void {
    if (!this.tipElement) {
      this.tipElement = document.createElement("div");
      this.tipElement.style.cssText = `
        position: absolute;
        padding: 6px 12px;
        background: rgba(0, 0, 0, 0.75);
        color: white;
        font-size: 12px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        z-index: 10000;
        transform: translate(10px, 10px);
      `;
      this.viewer.container.appendChild(this.tipElement);
    }
    this.tipElement.textContent = text;
    this.tipElement.style.display = "block";
  }

  /**
   * 隐藏提示
   */
  protected hideTip(): void {
    if (this.tipElement) {
      this.tipElement.style.display = "none";
    }
  }

  /**
   * 更新提示位置
   */
  protected updateTipPosition(screenPosition: Cartesian2): void {
    if (!this.tipElement) return;

    this.tipElement.style.left = `${screenPosition.x}px`;
    this.tipElement.style.top = `${screenPosition.y}px`;
  }

  /**
   * 添加点
   */
  protected addPoint(position: Cartesian3): void {
    this.positions.push(position);
    this.options.onPointAdd?.(position, this.positions.length - 1);
  }

  /**
   * 移除最后一个点
   */
  protected removeLastPoint(): Cartesian3 | null {
    if (this.positions.length === 0) return null;

    const removed = this.positions.pop()!;
    this.options.onPointRemove?.(removed, this.positions.length);
    return removed;
  }

  /**
   * 请求渲染
   */
  protected requestRender(): void {
    this.viewer.scene.requestRender();
  }

  // ===== 子类需要实现的方法 =====

  /**
   * 开始绘制时调用
   */
  protected abstract onStart(): void;

  /**
   * 停止绘制时调用
   */
  protected abstract onStop(): void;

  /**
   * 完成绘制时调用
   */
  protected abstract onComplete(): void;

  /**
   * 清除时调用
   */
  protected abstract onClear(): void;

  /**
   * 左键点击处理
   */
  protected abstract onLeftClick(position: Cartesian3): void;

  /**
   * 鼠标移动处理
   */
  protected abstract onMouseMove(position: Cartesian3): void;

  /**
   * 右键点击处理
   */
  protected abstract onRightClick(position: Cartesian3 | null): void;

  /**
   * 双击处理
   */
  protected abstract onDoubleClick(position: Cartesian3 | null): void;

  /**
   * 通过坐标直接绘制（子类实现）
   * @param options 绘制参数
   * @returns 绘制结果
   */
  abstract drawByPositions(options: unknown): DrawResult | null;
}
