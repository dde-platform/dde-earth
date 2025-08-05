/* eslint-disable @typescript-eslint/no-namespace */

import { BasePlugin } from "dde-earth";

import type { Earth } from "dde-earth";

/** 地球旋转刷新时间 */
const REFRESH_TIME = 6;

export class GlobeRotation extends BasePlugin {
  name = "Globe-Rotation";

  private rotationInterval?: number;
  private isRotating = false;

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

    // 如果配置中指定了自动开始旋转
    if (options?.autoStart) {
      this.startRotation();
    }

    return this;
  }

  /**
   * 开始旋转地球
   * @param rotationSpeed 旋转速度，默认为 0.03
   */
  startRotation(rotationSpeed?: number): void {
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

      const { camera, scene } = this.earth.viewer;
      camera.rotateRight(speed / REFRESH_TIME);
      scene.requestRender();

      this.rotationInterval = requestAnimationFrame(rotate);
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
    this.isRotating = false;
  }
}

export namespace GlobeRotation {
  export type Options = {
    /** 是否自动开始旋转 */
    autoStart?: boolean;
    /** 旋转速度 */
    rotationSpeed?: number;
  };
}
