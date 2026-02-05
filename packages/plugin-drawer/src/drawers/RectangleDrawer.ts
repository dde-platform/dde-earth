import {
  CallbackProperty,
  Cartographic,
  Entity,
  PolygonHierarchy,
  Rectangle,
} from "cesium";

import { BaseDrawer } from "./BaseDrawer";

import type { Cartesian3 } from "cesium";
import type {
  DrawByPositionsRectangleOptions,
  DrawResult,
  DrawerType,
} from "../types";

/**
 * 矩形绘制器
 * 点击起点，移动预览，点击终点完成
 */
export class RectangleDrawer extends BaseDrawer {
  readonly type: DrawerType = "rectangle";

  /** 起点实体 */
  private startPointEntity: Entity | null = null;

  /** 动态矩形实体 */
  private dynamicRectEntity: Entity | null = null;

  /** 起点 */
  private startPosition: Cartesian3 | null = null;

  protected onStart(): void {
    // 创建动态矩形
    this.createDynamicRectangle();
  }

  protected onStop(): void {
    this.removeDynamicRectangle();
    this.removeStartPoint();
    this.startPosition = null;
  }

  /** 最终边线实体 */
  private outlineEntity: Entity | null = null;

  protected onComplete(): void {
    // 移除动态元素
    this.removeDynamicRectangle();
    this.removeStartPoint();

    // 至少需要2个点（起点和终点）
    if (this.positions.length < 2) {
      return;
    }

    // 计算矩形边界
    const rectangle = this.calculateRectangle(
      this.positions[0],
      this.positions[1],
    );

    if (!rectangle) return;

    // 创建最终的矩形实体（填充）
    const corners = this.getRectangleCorners(rectangle);
    this.entity = this.viewer.entities.add({
      polygon: {
        hierarchy: new PolygonHierarchy(corners),
        ...this.style.polygon,
        outline: false, // 边线由单独的实体处理
      },
    });

    // 创建边线实体（闭合）
    this.outlineEntity = this.viewer.entities.add({
      polyline: {
        positions: [...corners, corners[0]], // 闭合
        ...this.style.polyline,
      },
    });
  }

  protected onClear(): void {
    this.removeDynamicRectangle();
    this.removeStartPoint();
    this.removeOutlineEntity();
    this.startPosition = null;
  }

  /**
   * 移除最终边线实体
   */
  private removeOutlineEntity(): void {
    if (this.outlineEntity) {
      this.viewer.entities.remove(this.outlineEntity);
      this.outlineEntity = null;
    }
  }

  /**
   * 获取边线实体
   */
  protected getOutlineEntity(): Entity | null {
    return this.outlineEntity;
  }

  protected onLeftClick(position: Cartesian3): void {
    if (!this.startPosition) {
      // 第一次点击设置起点
      this.startPosition = position;
      this.addPoint(position);
      this.addStartPointEntity(position);
      this.showTip(this.tips.bindPoint);
    } else {
      // 第二次点击设置终点并完成
      this.addPoint(position);
      this.complete();
    }

    this.requestRender();
  }

  protected onMouseMove(position: Cartesian3): void {
    this.currentMousePosition = position;
    this.requestRender();
  }

  protected onRightClick(_: Cartesian3 | null): void {
    if (this.startPosition) {
      // 清除起点，重新开始
      this.startPosition = null;
      this.positions = [];
      this.removeStartPoint();
      this.showTip(this.tips.init);
      this.requestRender();
    } else {
      // 没有起点时取消绘制
      this.stop();
    }
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    // 矩形绘制不需要处理双击
  }

  /**
   * 计算矩形边界
   */
  private calculateRectangle(
    start: Cartesian3,
    end: Cartesian3,
  ): Rectangle | null {
    const startCarto = Cartographic.fromCartesian(start);
    const endCarto = Cartographic.fromCartesian(end);

    if (!startCarto || !endCarto) return null;

    const west = Math.min(startCarto.longitude, endCarto.longitude);
    const east = Math.max(startCarto.longitude, endCarto.longitude);
    const south = Math.min(startCarto.latitude, endCarto.latitude);
    const north = Math.max(startCarto.latitude, endCarto.latitude);

    return new Rectangle(west, south, east, north);
  }

  /**
   * 获取矩形四个角点
   */
  private getRectangleCorners(rectangle: Rectangle): Cartesian3[] {
    const ellipsoid = this.viewer.scene.globe.ellipsoid;
    return [
      Cartographic.toCartesian(
        new Cartographic(rectangle.west, rectangle.south),
        ellipsoid,
      ),
      Cartographic.toCartesian(
        new Cartographic(rectangle.east, rectangle.south),
        ellipsoid,
      ),
      Cartographic.toCartesian(
        new Cartographic(rectangle.east, rectangle.north),
        ellipsoid,
      ),
      Cartographic.toCartesian(
        new Cartographic(rectangle.west, rectangle.north),
        ellipsoid,
      ),
    ];
  }

  /**
   * 创建动态矩形实体
   */
  private createDynamicRectangle(): void {
    this.dynamicRectEntity = this.viewer.entities.add({
      polygon: {
        hierarchy: new CallbackProperty(() => {
          if (!this.startPosition || !this.currentMousePosition) {
            return new PolygonHierarchy([]);
          }

          const rectangle = this.calculateRectangle(
            this.startPosition,
            this.currentMousePosition,
          );

          if (!rectangle) return new PolygonHierarchy([]);

          const corners = this.getRectangleCorners(rectangle);
          return new PolygonHierarchy(corners);
        }, false),
        ...this.style.polygon,
      },
    });
  }

  /**
   * 移除动态矩形实体
   */
  private removeDynamicRectangle(): void {
    if (this.dynamicRectEntity) {
      this.viewer.entities.remove(this.dynamicRectEntity);
      this.dynamicRectEntity = null;
    }
  }

  /**
   * 添加起点实体
   */
  private addStartPointEntity(position: Cartesian3): void {
    this.startPointEntity = this.viewer.entities.add({
      position,
      point: this.style.point,
    });
  }

  /**
   * 移除起点实体
   */
  private removeStartPoint(): void {
    if (this.startPointEntity) {
      this.viewer.entities.remove(this.startPointEntity);
      this.startPointEntity = null;
    }
  }

  /**
   * 通过坐标直接绘制矩形
   * @param options 绘制参数（2个对角点）
   * @returns 绘制结果
   */
  drawByPositions(options: DrawByPositionsRectangleOptions): DrawResult | null {
    const { positions } = options;
    if (!positions || positions.length < 2) {
      console.warn(
        "RectangleDrawer.drawByPositions: 2 corner positions are required",
      );
      return null;
    }

    // 清理之前的绘制
    this.clear();

    // 保存坐标
    this.positions = [positions[0], positions[1]];

    // 计算矩形边界
    const rectangle = this.calculateRectangle(positions[0], positions[1]);
    if (!rectangle) {
      console.warn("RectangleDrawer.drawByPositions: invalid positions");
      return null;
    }

    // 获取矩形四个角点
    const corners = this.getRectangleCorners(rectangle);

    // 创建矩形实体（填充）
    this.entity = this.viewer.entities.add({
      polygon: {
        hierarchy: new PolygonHierarchy(corners),
        ...this.style.polygon,
        outline: false, // 边线由单独的实体处理
      },
    });

    // 创建边线实体（闭合）
    this.outlineEntity = this.viewer.entities.add({
      polyline: {
        positions: [...corners, corners[0]], // 闭合
        ...this.style.polyline,
      },
    });

    // 创建结果
    const result: DrawResult = {
      entity: this.entity,
      positions: [...this.positions],
      type: this.type,
      outlineEntity: this.outlineEntity ?? undefined,
    };

    // 触发完成回调
    this.options.onComplete?.(result);

    // 请求渲染
    this.requestRender();

    return result;
  }
}
