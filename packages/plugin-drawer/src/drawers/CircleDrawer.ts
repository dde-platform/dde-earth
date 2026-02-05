import { CallbackProperty, Cartesian3, Entity } from "cesium";

import { BaseDrawer } from "./BaseDrawer";

import type { PositionProperty } from "cesium";
import type {
  DrawByPositionsCircleOptions,
  DrawResult,
  DrawerType,
} from "../types";

/**
 * 圆形绘制器
 * 点击圆心，移动调整半径，点击完成
 */
export class CircleDrawer extends BaseDrawer {
  readonly type: DrawerType = "circle";

  /** 圆心实体 */
  private centerPointEntity: Entity | null = null;

  /** 动态圆形实体 */
  private dynamicCircleEntity: Entity | null = null;

  /** 圆心 */
  private centerPosition: Cartesian3 | null = null;

  /** 半径（米） */
  private radius = 0;

  protected onStart(): void {
    // 创建动态圆形
    this.createDynamicCircle();
  }

  protected onStop(): void {
    this.removeDynamicCircle();
    this.removeCenterPoint();
    this.centerPosition = null;
    this.radius = 0;
  }

  protected onComplete(): void {
    // 移除动态元素
    this.removeDynamicCircle();
    this.removeCenterPoint();

    // 需要圆心和有效半径
    if (!this.centerPosition || this.radius <= 0) {
      return;
    }

    // 创建最终的圆形实体
    this.entity = this.viewer.entities.add({
      position: this.centerPosition,
      ellipse: {
        semiMajorAxis: this.radius,
        semiMinorAxis: this.radius,
        ...this.style.ellipse,
      },
    });

    // 保存圆心和边缘点到 positions
    this.positions = [this.centerPosition];
  }

  protected onClear(): void {
    this.removeDynamicCircle();
    this.removeCenterPoint();
    this.centerPosition = null;
    this.radius = 0;
  }

  protected onLeftClick(position: Cartesian3): void {
    if (!this.centerPosition) {
      // 第一次点击设置圆心
      this.centerPosition = position;
      this.addCenterPointEntity(position);
      this.showTip(this.tips.bindPoint);
    } else {
      // 第二次点击确定半径并完成
      this.radius = this.calculateDistance(this.centerPosition, position);
      if (this.radius > 0) {
        this.complete();
      }
    }

    this.requestRender();
  }

  protected onMouseMove(position: Cartesian3): void {
    this.currentMousePosition = position;

    // 如果已设置圆心，计算当前半径
    if (this.centerPosition) {
      this.radius = this.calculateDistance(this.centerPosition, position);
    }

    this.requestRender();
  }

  protected onRightClick(_: Cartesian3 | null): void {
    if (this.centerPosition) {
      // 清除圆心，重新开始
      this.centerPosition = null;
      this.radius = 0;
      this.removeCenterPoint();
      this.showTip(this.tips.init);
      this.requestRender();
    } else {
      // 没有圆心时取消绘制
      this.stop();
    }
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    // 圆形绘制不需要处理双击
  }

  /**
   * 计算两点之间的距离（米）
   */
  private calculateDistance(p1: Cartesian3, p2: Cartesian3): number {
    return Cartesian3.distance(p1, p2);
  }

  /**
   * 创建动态圆形实体
   */
  private createDynamicCircle(): void {
    this.dynamicCircleEntity = this.viewer.entities.add({
      position: new CallbackProperty(() => {
        return this.centerPosition || Cartesian3.ZERO;
      }, false) as unknown as PositionProperty,
      ellipse: {
        semiMajorAxis: new CallbackProperty(() => {
          if (!this.centerPosition || !this.currentMousePosition) {
            return 0;
          }
          return this.calculateDistance(
            this.centerPosition,
            this.currentMousePosition,
          );
        }, false),
        semiMinorAxis: new CallbackProperty(() => {
          if (!this.centerPosition || !this.currentMousePosition) {
            return 0;
          }
          return this.calculateDistance(
            this.centerPosition,
            this.currentMousePosition,
          );
        }, false),
        ...this.style.ellipse,
      },
    });
  }

  /**
   * 移除动态圆形实体
   */
  private removeDynamicCircle(): void {
    if (this.dynamicCircleEntity) {
      this.viewer.entities.remove(this.dynamicCircleEntity);
      this.dynamicCircleEntity = null;
    }
  }

  /**
   * 添加圆心实体
   */
  private addCenterPointEntity(position: Cartesian3): void {
    this.centerPointEntity = this.viewer.entities.add({
      position,
      point: this.style.point,
    });
  }

  /**
   * 移除圆心实体
   */
  private removeCenterPoint(): void {
    if (this.centerPointEntity) {
      this.viewer.entities.remove(this.centerPointEntity);
      this.centerPointEntity = null;
    }
  }

  /**
   * 获取当前半径
   */
  getRadius(): number {
    return this.radius;
  }

  /**
   * 通过坐标直接绘制圆形
   * @param options 绘制参数（圆心 + 半径或边缘点）
   * @returns 绘制结果
   */
  drawByPositions(options: DrawByPositionsCircleOptions): DrawResult | null {
    const { center, radius } = options;
    if (!center) {
      console.warn("CircleDrawer.drawByPositions: center position is required");
      return null;
    }

    // 清理之前的绘制
    this.clear();

    // 计算半径
    let radiusValue: number;
    if (typeof radius === "number") {
      radiusValue = radius;
    } else if (radius instanceof Cartesian3) {
      radiusValue = this.calculateDistance(center, radius);
    } else {
      console.warn(
        "CircleDrawer.drawByPositions: radius must be a number or Cartesian3",
      );
      return null;
    }

    if (radiusValue <= 0) {
      console.warn(
        "CircleDrawer.drawByPositions: radius must be greater than 0",
      );
      return null;
    }

    // 保存状态
    this.centerPosition = center;
    this.radius = radiusValue;
    this.positions = [center];

    // 创建圆形实体
    this.entity = this.viewer.entities.add({
      position: center,
      ellipse: {
        semiMajorAxis: radiusValue,
        semiMinorAxis: radiusValue,
        ...this.style.ellipse,
      },
    });

    // 创建结果
    const result: DrawResult = {
      entity: this.entity,
      positions: [...this.positions],
      type: this.type,
      radius: radiusValue,
    };

    // 触发完成回调
    this.options.onComplete?.(result);

    // 请求渲染
    this.requestRender();

    return result;
  }
}
