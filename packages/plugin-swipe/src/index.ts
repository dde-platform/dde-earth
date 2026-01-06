/* eslint-disable @typescript-eslint/no-explicit-any */

import * as Cesium from "cesium";
import { ImageryLayer, SplitDirection } from "cesium";
import { BasePlugin } from "dde-earth";

import type { Earth } from "dde-earth";

/**
 * 简单的卷帘（Swipe）插件
 *
 * 特性：
 * - 可选地在地球容器上渲染一个拖拽线（若宿主未提供 UI）
 * - 暴露 setPosition / getPosition API
 * - 尝试设置 Cesium scene.imagerySplitPosition
 * - 触发自定义事件 'swipe:change'、'swipe:layersChanged'
 */
export class Swipe extends BasePlugin {
  name = "Swipe";

  private _position = 0.5; // 0..1

  private _leftLayerIds: string[] = [];
  private _rightLayerIds: string[] = [];
  private _onLayerClick?: (id: string, side: "left" | "right") => void;

  init(earth: Earth, options?: Swipe.Options) {
    this._init(earth);

    this._position = options?.initialPosition ?? this._position;

    // Initialize all layer ids to right side by default
    const availableLayers = this.getAvailableLayers();
    this._rightLayerIds = availableLayers.map((l) => l.id);
    this._leftLayerIds = [];

    // Apply initial state
    this.setPosition(this._position);
    return this;
  }

  /** 设置卷帘位置（0..1） */
  setPosition(pos: number) {
    const clamped = Math.max(0, Math.min(1, pos));
    this._position = clamped;

    // Cesium imagery split position
    try {
      const scene: any = (this.earth as any)?.viewer?.scene;
      if (scene) {
        if (typeof scene.splitPosition !== "undefined") {
          scene.splitPosition = clamped;
        }
        if (typeof scene.imagerySplitPosition !== "undefined") {
          scene.imagerySplitPosition = clamped;
        }
        if ((this.earth as any)?.viewer?.scene?.requestRender) {
          (this.earth as any).viewer.scene.requestRender();
        }
      }
    } catch {
      // ignore
    }

    // emit change
    try {
      (this.earth as any).emit("swipe:change", clamped);
    } catch {
      // ignore
    }

    // apply split direction for configured layers
    try {
      const lm = (this.earth as any).layerManager as {
        layerList?: any[];
        baseLayer?: ImageryLayer;
      };
      if (lm && Array.isArray(lm.layerList)) {
        lm.layerList.forEach((layerItem: any) => {
          const inst = layerItem.instance;
          if (inst && inst instanceof ImageryLayer) {
            if (this._leftLayerIds.includes(layerItem.id)) {
              inst.splitDirection = SplitDirection.LEFT;
            } else if (this._rightLayerIds.includes(layerItem.id)) {
              inst.splitDirection = SplitDirection.RIGHT;
            } else {
              inst.splitDirection = SplitDirection.NONE as any;
            }
          }
        });

        const base = (this.earth as any).layerManager?.baseLayer as
          | ImageryLayer
          | undefined;
        if (base) {
          if (this._leftLayerIds.includes("__base__")) {
            base.splitDirection = SplitDirection.LEFT as any;
          } else if (this._rightLayerIds.includes("__base__")) {
            base.splitDirection = SplitDirection.RIGHT as any;
          } else {
            base.splitDirection = SplitDirection.NONE as any;
          }
        }

        if (this.viewer?.scene?.requestRender)
          this.viewer.scene.requestRender();
      }
    } catch {
      // ignore
    }
  }

  /** Get available layers from layer manager */
  getAvailableLayers(): any[] {
    const lm = (this.earth as any).layerManager as {
      layerList?: any[];
      baseLayer?: any;
    };
    if (!lm || !Array.isArray(lm.layerList)) return [];

    const list = lm.layerList.map((layerItem: any) => ({
      id: layerItem.id,
      name:
        layerItem.data?.layerName || layerItem.data?.id || String(layerItem.id),
    }));

    if ((this.earth as any).layerManager?.baseLayer) {
      list.unshift({ id: "__base__", name: "Base Layer" });
    }

    return list;
  }

  /** Configure which layer ids should be forced to left (masked) */
  setLeftLayers(ids: string[]) {
    if (!ids || ids.length === 0) {
      this._leftLayerIds = [];
      this._rightLayerIds = this.getAvailableLayers().map((l) => l.id);
    } else if (ids.length === 1) {
      this._leftLayerIds = [ids[0]];
      this._rightLayerIds = this.getAvailableLayers()
        .map((l) => l.id)
        .filter((id) => id !== ids[0]);
    } else {
      const firstTwo = ids.slice(0, 2);
      this._leftLayerIds = [firstTwo[0]];
      this._rightLayerIds = [firstTwo[1]];
      const availableIds = this.getAvailableLayers().map((l) => l.id);
      const remaining = availableIds.filter((id) => !firstTwo.includes(id));
      this._rightLayerIds = this._rightLayerIds.concat(remaining);
    }

    this.setPosition(this._position);
    try {
      (this.earth as any).emit("swipe:layersChanged", {
        left: this._leftLayerIds,
        right: this._rightLayerIds,
      });
    } catch {
      // ignore
    }
  }

  /** Configure which layer ids should be forced to right (masked) */
  setRightLayers(ids: string[]) {
    this._rightLayerIds = ids || [];
    const availableLayers = this.getAvailableLayers();
    this._leftLayerIds = availableLayers
      .map((l) => l.id)
      .filter((id) => !this._rightLayerIds.includes(id));

    this.setPosition(this._position);
    try {
      (this.earth as any).emit("swipe:layersChanged", {
        left: this._leftLayerIds,
        right: this._rightLayerIds,
      });
    } catch {
      // ignore
    }
  }

  getLeftLayers() {
    return [...this._leftLayerIds];
  }

  getRightLayers() {
    return [...this._rightLayerIds];
  }

  getPosition() {
    return this._position;
  }

  onLayerClick(callback: (id: string, side: "left" | "right") => void) {
    this._onLayerClick = callback;
  }

  hide() {
    // Hide should reset split so UI can toggle off without destroying plugin
    try {
      const viewer = (this.earth as any)?.viewer as Cesium.Viewer | undefined;
      if (!viewer) return;

      const imageryLayers = viewer.imageryLayers;
      for (let i = 0; i < imageryLayers.length; i++) {
        const layer = imageryLayers.get(i);
        layer.splitDirection = Cesium.SplitDirection.NONE;
      }

      viewer.scene.requestRender();
    } catch {
      // ignore
    }
  }

  show() {
    this.setPosition(this._position);
  }

  destroy() {
    this.hide();
    super.destroy();
  }
}

export type SwipeOptions = {
  /** 初始位置 0..1，默认为 0.5 */
  initialPosition?: number;
};

/**
 * SwipeCore - Cesium 卷帘控制器（供宿主调用）
 */
export class SwipeCore {
  private static instance?: SwipeCore;
  private earth?: Earth;
  private swipe?: Swipe;
  private _position = 0.5;
  private _inited = false;

  // 左侧图层 Cesium 对象
  private leftCesiumLayers: Cesium.ImageryLayer[] = [];

  private constructor() {}

  static getInstance(): SwipeCore {
    if (!SwipeCore.instance) {
      SwipeCore.instance = new SwipeCore();
    }
    return SwipeCore.instance;
  }

  /**
   * 初始化 Swipe 插件
   */
  init(earth: Earth) {
    this.earth = earth;
    const viewer = (earth as any).viewer as Cesium.Viewer | undefined;
    if (!viewer) return;

    if (this._inited) return;
    this._inited = true;

    const initSwipe = () => {
      viewer.scene.postRender.removeEventListener(initSwipe);
      const swipe = new Swipe();
      swipe.init(earth, { initialPosition: this._position });
      this.swipe = swipe;
      viewer.scene.requestRender();
    };

    viewer.scene.postRender.addEventListener(initSwipe);
  }

  /** 当前卷帘位置 0~1 */
  get position(): number {
    return this.swipe?.getPosition?.() ?? this._position;
  }

  /** 设置左侧图层（Cesium 对象） */
  setLeftCesiumLayers(layers: Cesium.ImageryLayer[]) {
    this.leftCesiumLayers = layers;
    this.updateSplitLayers();
  }

  getLeftCesiumLayers(): Cesium.ImageryLayer[] {
    return [...this.leftCesiumLayers];
  }

  /** 更新卷帘位置 */
  updatePosition(position: number) {
    if (!this.swipe) return;
    this._position = position;
    this.swipe.setPosition(position);
    this.updateSplitLayers();
  }

  /** 更新 Cesium 图层 splitDirection */
  private updateSplitLayers() {
    const viewer = (this.earth as any)?.viewer as Cesium.Viewer | undefined;
    if (!viewer) return;

    const scene: any = viewer.scene;
    if (typeof scene.splitPosition !== "undefined") {
      scene.splitPosition = this._position;
    }
    if (typeof scene.imagerySplitPosition !== "undefined") {
      scene.imagerySplitPosition = this._position;
    }

    const imageryLayers = viewer.imageryLayers;
    for (let i = 0; i < imageryLayers.length; i++) {
      const layer = imageryLayers.get(i);
      if (this.leftCesiumLayers.includes(layer)) {
        layer.splitDirection = Cesium.SplitDirection.LEFT;
      } else {
        layer.splitDirection = Cesium.SplitDirection.RIGHT;
      }
    }

    viewer.scene.requestRender();
  }

  /** 显示卷帘 */
  show() {
    this.swipe?.show();
    this.updateSplitLayers();
  }

  /** 隐藏卷帘 */
  hide() {
    this.swipe?.hide();

    const viewer = (this.earth as any)?.viewer as Cesium.Viewer | undefined;
    if (!viewer) return;

    const imageryLayers = viewer.imageryLayers;
    for (let i = 0; i < imageryLayers.length; i++) {
      const layer = imageryLayers.get(i);
      layer.splitDirection = Cesium.SplitDirection.NONE;
    }

    viewer.scene.requestRender();
  }

  destroy() {
    this.swipe?.destroy();
    this.swipe = undefined;
    this.earth = undefined;
    SwipeCore.instance = undefined;
    this.leftCesiumLayers = [];
  }
}

export const swipeCore = SwipeCore.getInstance();
