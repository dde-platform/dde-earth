/* eslint-disable @typescript-eslint/no-namespace */

import { SceneMode } from "cesium";
import { BasePlugin } from "dde-earth";

import { rotateAroundEarthAxis } from "./earth-axis-rotation";

import type { Viewer } from "cesium";
import type { Earth } from "dde-earth";

/** 地球旋转刷新时间 */
const REFRESH_TIME = 6;

const defaultRotationStep: GlobeRotation.RotationStep = (viewer, angle) => {
  rotateAroundEarthAxis(viewer.camera, angle);
};

export class GlobeRotation extends BasePlugin {
  name = "Globe-Rotation";

  private rotationInterval?: number;
  private isRotating = false;
  private rotationStep: GlobeRotation.RotationStep = defaultRotationStep;

  hide() {
    // 当插件隐藏时停止旋转
    this.stopRotation();
  }

  show() {
    // 插件显示时，如果之前在旋转状态，则继续旋转
    if (this.isRotating) {
      this.startRotation();
    }
  }

  init(earth: Earth, options?: GlobeRotation.Options) {
    this._init(earth);
    this.rotationStep = options?.rotationStep ?? defaultRotationStep;

    // 如果配置中指定了自动开始旋转
    if (options?.autoStart) {
      this.startRotation(options.rotationSpeed);
    }

    return this;
  }

  /**
   * 开始旋转地球
   * @param rotationSpeed 旋转速度，默认为 0.03
   */
  startRotation(rotationSpeed?: number): void {
    if (this.isDestroyed) return;
    if (!this.earth?.viewer || this.earth.viewer.isDestroyed()) {
      console.warn("Viewer is not available for rotation");
      return;
    }

    // 如果已经在旋转，先停止
    if (this.rotationInterval) {
      this.stopRotation();
    }

    const speed = rotationSpeed ?? 0.03;
    this.isRotating = true;

    // 使用 requestAnimationFrame 实现平滑旋转
    const rotate = () => {
      if (
        !this.isRotating ||
        !this.earth?.viewer ||
        this.earth.viewer.isDestroyed()
      ) {
        return;
      }

      const viewer = this.earth.viewer;
      const { scene } = viewer;
      if (
        scene.mode === SceneMode.SCENE3D &&
        scene.screenSpaceCameraController.enableInputs
      ) {
        this.rotationStep(viewer, speed / REFRESH_TIME);
        if (!viewer.isDestroyed()) scene.requestRender();
      }

      // 注入的实现可能在通知监听者时停止或销毁插件，不再留下下一帧。
      if (this.isRotating && !viewer.isDestroyed()) {
        this.rotationInterval = requestAnimationFrame(rotate);
      }
    };

    this.rotationInterval = requestAnimationFrame(rotate);
  }

  /**
   * 停止旋转地球
   */
  stopRotation(): void {
    if (this.rotationInterval) {
      cancelAnimationFrame(this.rotationInterval);
      this.rotationInterval = undefined;
    }
    this.isRotating = false;
  }

  /**
   * 切换旋转状态
   */
  toggleRotation(): void {
    if (this.isRotating) {
      this.stopRotation();
    } else {
      this.startRotation();
    }
  }

  /**
   * 获取当前旋转状态
   */
  getRotationState(): boolean {
    return this.isRotating;
  }

  destroy(): void {
    this.stopRotation();
    this.rotationStep = defaultRotationStep;
    super.destroy();
  }
}

export namespace GlobeRotation {
  /**
   * 执行一次地球自转。angle 为弧度，正值表示绕地心 Z 轴向东自转。
   * 实现应保持球心屏幕位置、尺度和观察纬度，并同步自身管理的视图状态。
   * 插件仅在三维且允许输入时调用；导航转向不属于此接口。
   */
  export type RotationStep = (viewer: Viewer, angle: number) => void;

  export type Options = {
    /** 是否自动开始旋转 */
    autoStart?: boolean;
    /** 旋转速度 */
    rotationSpeed?: number;
    /** 显式注入视图管理者的自转实现；省略时使用通用相机绕地轴旋转。 */
    rotationStep?: RotationStep;
  };
}
