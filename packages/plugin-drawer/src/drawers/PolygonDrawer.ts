import { CallbackProperty, Entity, PolygonHierarchy } from "cesium";

import { BaseDrawer } from "./BaseDrawer";

import type { Cartesian3 } from "cesium";
import type {
  DrawByPositionsPolygonOptions,
  DrawResult,
  DrawerType,
} from "../types";

/**
 * 多边形绘制器
 * 左键添加点，右键撤销上一点，双击完成绘制
 */
export class PolygonDrawer extends BaseDrawer {
  readonly type: DrawerType = "polygon";

  /** 顶点实体列表 */
  private vertexEntities: Entity[] = [];

  /** 动态多边形实体 */
  private dynamicPolygonEntity: Entity | null = null;

  /** 动态边线实体 */
  private dynamicOutlineEntity: Entity | null = null;

  protected onStart(): void {
    // 创建动态多边形和边线
    this.createDynamicPolygon();
    this.createDynamicOutline();
  }

  protected onStop(): void {
    this.removeDynamicPolygon();
    this.removeDynamicOutline();
    this.removeVertexEntities();
  }

  /** 最终边线实体 */
  private outlineEntity: Entity | null = null;

  protected onComplete(): void {
    // 移除动态元素和顶点
    this.removeDynamicPolygon();
    this.removeDynamicOutline();
    this.removeVertexEntities();

    // 至少需要3个点才能形成多边形
    if (this.positions.length < 3) {
      return;
    }

    // 创建最终的多边形实体（填充）
    this.entity = this.viewer.entities.add({
      polygon: {
        hierarchy: new PolygonHierarchy([...this.positions]),
        ...this.style.polygon,
        outline: false, // 边线由单独的实体处理
      },
    });

    // 创建边线实体（闭合）
    this.outlineEntity = this.viewer.entities.add({
      polyline: {
        positions: [...this.positions, this.positions[0]], // 闭合
        ...this.style.polyline,
      },
    });
  }

  protected onClear(): void {
    this.removeDynamicPolygon();
    this.removeDynamicOutline();
    this.removeVertexEntities();
    this.removeOutlineEntity();
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
    // 添加点
    this.addPoint(position);

    // 添加顶点标记
    this.addVertexEntity(position);

    // 更新提示
    if (this.positions.length < 3) {
      this.showTip(this.tips.bindPoint);
    } else {
      this.showTip(this.tips.bindLastPoint);
    }

    this.requestRender();
  }

  protected onMouseMove(position: Cartesian3): void {
    // 更新当前鼠标位置用于动态预览
    this.currentMousePosition = position;
    this.requestRender();
  }

  protected onRightClick(_: Cartesian3 | null): void {
    // 撤销上一个点
    if (this.positions.length > 0) {
      this.removeLastPoint();
      this.removeLastVertexEntity();

      // 更新提示
      if (this.positions.length === 0) {
        this.showTip(this.tips.init);
      } else if (this.positions.length < 3) {
        this.showTip(this.tips.bindPoint);
      }

      this.requestRender();
    } else {
      // 没有点时取消绘制
      this.stop();
    }
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    // 双击完成绘制（至少需要3个点）
    if (this.positions.length >= 3) {
      this.complete();
    }
  }

  /**
   * 创建动态多边形实体
   */
  private createDynamicPolygon(): void {
    this.dynamicPolygonEntity = this.viewer.entities.add({
      polygon: {
        hierarchy: new CallbackProperty(() => {
          if (this.positions.length < 2) {
            return new PolygonHierarchy([]);
          }
          const positions = this.currentMousePosition
            ? [...this.positions, this.currentMousePosition]
            : [...this.positions];
          return new PolygonHierarchy(positions);
        }, false),
        ...this.style.polygon,
        outline: false, // 边线由单独的实体处理
      },
    });
  }

  /**
   * 移除动态多边形实体
   */
  private removeDynamicPolygon(): void {
    if (this.dynamicPolygonEntity) {
      this.viewer.entities.remove(this.dynamicPolygonEntity);
      this.dynamicPolygonEntity = null;
    }
  }

  /**
   * 创建动态边线实体
   */
  private createDynamicOutline(): void {
    this.dynamicOutlineEntity = this.viewer.entities.add({
      polyline: {
        positions: new CallbackProperty(() => {
          if (this.positions.length === 0) {
            return [];
          }
          const positions = this.currentMousePosition
            ? [...this.positions, this.currentMousePosition]
            : [...this.positions];

          // 闭合多边形边线
          if (positions.length >= 3) {
            return [...positions, positions[0]];
          }
          return positions;
        }, false),
        ...this.style.polyline,
      },
    });
  }

  /**
   * 移除动态边线实体
   */
  private removeDynamicOutline(): void {
    if (this.dynamicOutlineEntity) {
      this.viewer.entities.remove(this.dynamicOutlineEntity);
      this.dynamicOutlineEntity = null;
    }
  }

  /**
   * 添加顶点实体
   */
  private addVertexEntity(position: Cartesian3): void {
    const entity = this.viewer.entities.add({
      position,
      point: {
        ...this.style.point,
        pixelSize: ((this.style.point?.pixelSize as number) || 10) * 0.6,
      },
    });
    this.vertexEntities.push(entity);
  }

  /**
   * 移除最后一个顶点实体
   */
  private removeLastVertexEntity(): void {
    const entity = this.vertexEntities.pop();
    if (entity) {
      this.viewer.entities.remove(entity);
    }
  }

  /**
   * 移除所有顶点实体
   */
  private removeVertexEntities(): void {
    for (const entity of this.vertexEntities) {
      this.viewer.entities.remove(entity);
    }
    this.vertexEntities = [];
  }

  /**
   * 通过坐标直接绘制多边形
   * @param options 绘制参数
   * @returns 绘制结果
   */
  drawByPositions(options: DrawByPositionsPolygonOptions): DrawResult | null {
    const { positions } = options;
    if (!positions || positions.length < 3) {
      console.warn(
        "PolygonDrawer.drawByPositions: at least 3 positions are required",
      );
      return null;
    }

    // 清理之前的绘制
    this.clear();

    // 保存坐标
    this.positions = [...positions];

    // 创建多边形实体（填充）
    this.entity = this.viewer.entities.add({
      polygon: {
        hierarchy: new PolygonHierarchy([...this.positions]),
        ...this.style.polygon,
        outline: false, // 边线由单独的实体处理
      },
    });

    // 创建边线实体（闭合）
    this.outlineEntity = this.viewer.entities.add({
      polyline: {
        positions: [...this.positions, this.positions[0]], // 闭合
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
