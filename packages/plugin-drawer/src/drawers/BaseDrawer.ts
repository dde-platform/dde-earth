import {
  Cartesian2,
  Cartesian3,
  Cartesian4,
  Cartographic,
  Math as CesiumMath,
  Entity,
  Matrix4,
  SceneMode,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
  defined,
} from "cesium";

import { getDefaultStyle, getDefaultTips, mergeStyle } from "../config";

import type { Viewer } from "cesium";
import type {
  BaseDrawerConfig,
  DrawResult,
  DrawerOptions,
  DrawerStatus,
  DrawerStyleOptions,
  DrawerTips,
  DrawerType,
} from "../types";

interface ScreenPickResult {
  cartesian: Cartesian3;
  screenPosition: Cartesian2;
  scene2DCartographic: Cartographic | null;
}

const projected2DScratch = new Cartesian3();
const worldPosition2DScratch = new Cartesian4();
const eyePosition2DScratch = new Cartesian4();
const clipPosition2DScratch = new Cartesian4();

/**
 * 绘图器基类，提供通用事件处理、实体管理与交互状态维护。
 */
export abstract class BaseDrawer {
  abstract readonly type: DrawerType;

  protected viewer: Viewer;

  protected handler: ScreenSpaceEventHandler | null = null;

  protected status: DrawerStatus = "idle";

  /** 逻辑坐标，作为绘制结果输出给业务层。 */
  protected positions: Cartesian3[] = [];

  /** 记录交互点击时的屏幕坐标，用于双击去重与 2D 叠加层回退。 */
  protected pointScreenPositions: Array<Cartesian2 | null> = [];

  /** 2D 模式下记录未归一化经度的点位，保证无限滚动下预览连续。 */
  protected pointCartographics2D: Array<Cartographic | null> = [];

  /** 当前鼠标对应的逻辑坐标。 */
  protected currentMousePosition: Cartesian3 | null = null;

  /** 2D 模式下当前鼠标对应的未归一化经纬度。 */
  protected currentMouseCartographic2D: Cartographic | null = null;

  /** 2D 模式下当前鼠标对应的屏幕坐标。 */
  protected currentMouseScreenPosition: Cartesian2 | null = null;

  protected entity: Entity | null = null;

  protected options: DrawerOptions;

  protected style: DrawerStyleOptions;

  protected tips: DrawerTips;

  protected tipElement: HTMLDivElement | null = null;

  protected isDestroyed = false;

  private pendingPointScreenPosition: Cartesian2 | null = null;

  private pendingPointCartographic2D: Cartographic | null = null;

  constructor(config: BaseDrawerConfig) {
    this.viewer = config.viewer;
    this.options = config.options || {};
    this.tips = config.tips || getDefaultTips();
    this.style = mergeStyle(getDefaultStyle(), this.options.style);

    if (this.options.tips) {
      this.tips = { ...this.tips, ...this.options.tips };
    }
  }

  start(): void {
    if (this.isDestroyed) {
      console.warn("Drawer has been destroyed");
      return;
    }

    this.clear();

    // 阻止 Cesium 双击后自动跟踪实体，避免与绘制交互冲突。
    this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );

    this.handler = new ScreenSpaceEventHandler(this.viewer.canvas);
    this.status = "drawing";

    this.bindEvents();

    if (this.options.showTips !== false) {
      this.showTip(this.tips.init);
    }

    this.onStart();
  }

  stop(): void {
    this.status = "idle";
    this.unbindEvents();
    this.hideTip();

    this.onStop();
    this.options.onCancel?.();
  }

  protected complete(): void {
    if (this.positions.length === 0) {
      this.stop();
      return;
    }

    this.status = "idle";
    this.unbindEvents();
    this.hideTip();

    this.onComplete();

    const result: DrawResult = {
      entity: this.entity!,
      positions: [...this.positions],
      type: this.type,
      outlineEntity: this.getOutlineEntity() ?? undefined,
    };

    this.options.onComplete?.(result);

    if (!this.options.keepAfterComplete) {
      // 默认不主动清理，由调用方决定是否保留。
    }

    this.requestRender();
  }

  protected getOutlineEntity(): Entity | null {
    return null;
  }

  clear(): void {
    if (this.entity && this.viewer.entities.contains(this.entity)) {
      this.viewer.entities.remove(this.entity);
    }
    this.entity = null;

    this.setPoints([]);
    this.currentMousePosition = null;
    this.currentMouseCartographic2D = null;
    this.currentMouseScreenPosition = null;

    this.unbindEvents();
    this.hideTip();
    this.status = "idle";

    this.onClear();
  }

  destroy(): void {
    this.clear();
    this.isDestroyed = true;
  }

  protected bindEvents(): void {
    if (!this.handler) return;

    this.handler.setInputAction(
      this.handleLeftClick.bind(this),
      ScreenSpaceEventType.LEFT_CLICK,
    );
    this.handler.setInputAction(
      this.handleMouseMove.bind(this),
      ScreenSpaceEventType.MOUSE_MOVE,
    );
    this.handler.setInputAction(
      this.handleRightClick.bind(this),
      ScreenSpaceEventType.RIGHT_CLICK,
    );
    this.handler.setInputAction(
      this.handleDoubleClick.bind(this),
      ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
    );
  }

  protected unbindEvents(): void {
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
  }

  protected handleLeftClick(event: { position: Cartesian2 }): void {
    const pickResult = this.pickScreenPosition(event.position);
    if (!pickResult) return;

    this.pendingPointScreenPosition = Cartesian2.clone(
      pickResult.screenPosition,
    );
    this.pendingPointCartographic2D = pickResult.scene2DCartographic
      ? Cartographic.clone(pickResult.scene2DCartographic)
      : null;

    try {
      this.onLeftClick(pickResult.cartesian);
    } finally {
      this.pendingPointScreenPosition = null;
      this.pendingPointCartographic2D = null;
    }
  }

  protected handleMouseMove(event: { endPosition: Cartesian2 }): void {
    const pickResult = this.pickScreenPosition(event.endPosition);
    if (!pickResult) return;

    this.currentMousePosition = pickResult.cartesian;
    this.currentMouseCartographic2D = pickResult.scene2DCartographic
      ? Cartographic.clone(pickResult.scene2DCartographic)
      : null;
    this.currentMouseScreenPosition = Cartesian2.clone(
      pickResult.screenPosition,
    );

    this.onMouseMove(pickResult.cartesian);

    if (this.tipElement) {
      this.updateTipPosition(event.endPosition);
    }
  }

  protected handleRightClick(event: { position: Cartesian2 }): void {
    const pickResult = this.pickScreenPosition(event.position);
    this.onRightClick(pickResult?.cartesian ?? null);
  }

  protected handleDoubleClick(event: { position: Cartesian2 }): void {
    const pickResult = this.pickScreenPosition(event.position);
    this.onDoubleClick(pickResult?.cartesian ?? null);
  }

  protected getCartesian3FromScreen(position: Cartesian2): Cartesian3 | null {
    return this.pickScreenPosition(position)?.cartesian ?? null;
  }

  /**
   * 将屏幕点击解析为逻辑坐标，并在 2D 下额外保留未归一化经度。
   */
  private pickScreenPosition(position: Cartesian2): ScreenPickResult | null {
    if (this.viewer.scene.mode === SceneMode.SCENE2D) {
      return this.pickScreenPositionIn2D(position);
    }

    const ray = this.viewer.camera.getPickRay(position);
    if (!ray) return null;

    const terrainPick = this.viewer.scene.globe.pick(ray, this.viewer.scene);
    if (defined(terrainPick)) {
      return {
        cartesian: terrainPick,
        screenPosition: new Cartesian2(position.x, position.y),
        scene2DCartographic: null,
      };
    }

    const ellipsoidPick = this.viewer.camera.pickEllipsoid(
      position,
      this.viewer.scene.globe.ellipsoid,
    );
    if (!ellipsoidPick) {
      return null;
    }

    return {
      cartesian: ellipsoidPick,
      screenPosition: new Cartesian2(position.x, position.y),
      scene2DCartographic: null,
    };
  }

  /**
   * 2D 模式下沿用 Cesium pickMap2D 的思路，从投影平面取点并保留未归一化经度。
   */
  private pickScreenPositionIn2D(
    position: Cartesian2,
  ): ScreenPickResult | null {
    const ray = this.viewer.camera.getPickRay(position);
    if (!ray) return null;

    const projected = Cartesian3.fromElements(
      ray.origin.y,
      ray.origin.z,
      0,
      projected2DScratch,
    );
    const rawCartographic =
      this.viewer.scene.mapProjection.unproject(projected);

    if (!defined(rawCartographic)) {
      return null;
    }

    if (
      rawCartographic.latitude < -CesiumMath.PI_OVER_TWO ||
      rawCartographic.latitude > CesiumMath.PI_OVER_TWO
    ) {
      return null;
    }

    const reference = this.getLastCommitted2DCartographic();
    const unwrappedLongitude = reference
      ? this.unwrapLongitude(rawCartographic.longitude, reference.longitude)
      : rawCartographic.longitude;
    const scene2DCartographic = new Cartographic(
      unwrappedLongitude,
      rawCartographic.latitude,
      rawCartographic.height,
    );

    return {
      cartesian: this.viewer.scene.globe.ellipsoid.cartographicToCartesian(
        scene2DCartographic,
        new Cartesian3(),
      ),
      screenPosition: new Cartesian2(position.x, position.y),
      scene2DCartographic,
    };
  }

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

  protected hideTip(): void {
    if (this.tipElement) {
      this.tipElement.style.display = "none";
    }
  }

  protected updateTipPosition(screenPosition: Cartesian2): void {
    if (!this.tipElement) return;

    this.tipElement.style.left = `${screenPosition.x}px`;
    this.tipElement.style.top = `${screenPosition.y}px`;
  }

  /**
   * 统一设置点集，确保逻辑点位与交互缓存同步清空。
   */
  protected setPoints(positions: Cartesian3[]): void {
    this.positions = [...positions];
    this.pointScreenPositions = this.positions.map(() => null);
    this.pointCartographics2D = this.positions.map(() => null);
  }

  protected addPoint(position: Cartesian3): void {
    this.positions.push(position);
    this.pointScreenPositions.push(
      this.pendingPointScreenPosition
        ? Cartesian2.clone(this.pendingPointScreenPosition)
        : null,
    );
    this.pointCartographics2D.push(
      this.pendingPointCartographic2D
        ? Cartographic.clone(this.pendingPointCartographic2D)
        : null,
    );
    this.options.onPointAdd?.(position, this.positions.length - 1);
  }

  protected removeLastPoint(): Cartesian3 | null {
    if (this.positions.length === 0) return null;

    const removed = this.positions.pop()!;
    this.pointScreenPositions.pop();
    this.pointCartographics2D.pop();
    this.options.onPointRemove?.(removed, this.positions.length);
    return removed;
  }

  /**
   * 2D 模式下，绘制中的预览改为走屏幕叠加层，避免无限滚动时回落到错误副本。
   */
  protected shouldUse2DScreenOverlay(): boolean {
    return this.viewer.scene.mode === SceneMode.SCENE2D;
  }

  /**
   * 获取 2D 绘制态当前应渲染的屏幕点位。
   */
  protected getInteractive2DScreenPoints(
    includeCurrentMouse = false,
  ): Cartesian2[] {
    if (!this.shouldUse2DScreenOverlay()) {
      return [];
    }

    const screenPoints: Cartesian2[] = [];

    this.pointCartographics2D.forEach((cartographic, index) => {
      const projected =
        cartographic && this.project2DCartographicToScreen(cartographic);
      const point = projected ?? this.pointScreenPositions[index];

      if (point) {
        screenPoints.push(Cartesian2.clone(point));
      }
    });

    if (includeCurrentMouse) {
      const projected =
        this.currentMouseCartographic2D &&
        this.project2DCartographicToScreen(this.currentMouseCartographic2D);
      const point = projected ?? this.currentMouseScreenPosition;

      if (point) {
        screenPoints.push(Cartesian2.clone(point));
      }
    }

    return screenPoints;
  }

  /**
   * 将 2D 未归一化经纬度投影回当前屏幕，保证缩放/平移时预览仍贴合地图。
   */
  protected project2DCartographicToScreen(
    cartographic: Cartographic,
    result?: Cartesian2,
  ): Cartesian2 | null {
    if (!this.shouldUse2DScreenOverlay()) {
      return null;
    }

    const { clientWidth, clientHeight } = this.viewer.scene.canvas;
    if (clientWidth === 0 || clientHeight === 0) {
      return null;
    }

    const projected = this.viewer.scene.mapProjection.project(
      cartographic,
      projected2DScratch,
    );
    const worldPosition = Cartesian4.fromElements(
      0,
      projected.x,
      projected.y,
      1,
      worldPosition2DScratch,
    );
    const eyePosition = Matrix4.multiplyByVector(
      this.viewer.camera.viewMatrix,
      worldPosition,
      eyePosition2DScratch,
    );
    const clipPosition = Matrix4.multiplyByVector(
      this.viewer.camera.frustum.projectionMatrix,
      eyePosition,
      clipPosition2DScratch,
    );

    if (clipPosition.w === 0) {
      return null;
    }

    const normalizedX = clipPosition.x / clipPosition.w;
    const normalizedY = clipPosition.y / clipPosition.w;
    if (!Number.isFinite(normalizedX) || !Number.isFinite(normalizedY)) {
      return null;
    }

    return Cartesian2.fromElements(
      (normalizedX + 1) * 0.5 * clientWidth,
      (1 - normalizedY) * 0.5 * clientHeight,
      result,
    );
  }

  /**
   * 双击结束时，移除第二击带来的尾部重复点。
   */
  protected removeDoubleClickDuplicatePoint(pixelTolerance = 5): boolean {
    if (this.positions.length < 2 || this.pointScreenPositions.length < 2) {
      return false;
    }

    const lastScreenPosition =
      this.pointScreenPositions[this.pointScreenPositions.length - 1];
    const previousScreenPosition =
      this.pointScreenPositions[this.pointScreenPositions.length - 2];

    if (!lastScreenPosition || !previousScreenPosition) {
      return false;
    }

    const xDiff = lastScreenPosition.x - previousScreenPosition.x;
    const yDiff = lastScreenPosition.y - previousScreenPosition.y;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (distance > pixelTolerance) {
      return false;
    }

    return this.removeLastPoint() !== null;
  }

  protected requestRender(): void {
    this.viewer.scene.requestRender();
  }

  private getLastCommitted2DCartographic(): Cartographic | null {
    for (
      let index = this.pointCartographics2D.length - 1;
      index >= 0;
      index--
    ) {
      const cartographic = this.pointCartographics2D[index];
      if (cartographic) {
        return cartographic;
      }
    }

    return null;
  }

  private unwrapLongitude(
    longitude: number,
    referenceLongitude: number,
  ): number {
    let result = longitude;

    while (result - referenceLongitude > Math.PI) {
      result -= CesiumMath.TWO_PI;
    }

    while (result - referenceLongitude < -Math.PI) {
      result += CesiumMath.TWO_PI;
    }

    return result;
  }

  protected abstract onStart(): void;

  protected abstract onStop(): void;

  protected abstract onComplete(): void;

  protected abstract onClear(): void;

  protected abstract onLeftClick(position: Cartesian3): void;

  protected abstract onMouseMove(position: Cartesian3): void;

  protected abstract onRightClick(position: Cartesian3 | null): void;

  protected abstract onDoubleClick(position: Cartesian3 | null): void;

  abstract drawByPositions(options: unknown): DrawResult | null;
}
