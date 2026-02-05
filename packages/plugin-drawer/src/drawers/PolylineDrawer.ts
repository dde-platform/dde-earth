import { CallbackProperty, Entity } from "cesium";

import { BaseDrawer } from "./BaseDrawer";

import type { Cartesian3 } from "cesium";
import type {
  DrawByPositionsLineOptions,
  DrawResult,
  DrawerType,
} from "../types";

/**
 * 线绘制器
 * 左键添加点，右键撤销上一点，双击完成绘制
 */
export class PolylineDrawer extends BaseDrawer {
  readonly type: DrawerType = "line";

  /** 顶点实体列表 */
  private vertexEntities: Entity[] = [];

  /** 动态线实体 */
  private dynamicLineEntity: Entity | null = null;

  protected onStart(): void {
    // 创建动态线实体
    this.createDynamicLine();
  }

  protected onStop(): void {
    this.removeDynamicLine();
    this.removeVertexEntities();
  }

  protected onComplete(): void {
    // 移除动态线和顶点
    this.removeDynamicLine();
    this.removeVertexEntities();

    // 至少需要2个点才能形成线
    if (this.positions.length < 2) {
      return;
    }

    // 创建最终的线实体
    this.entity = this.viewer.entities.add({
      polyline: {
        positions: [...this.positions],
        ...this.style.polyline,
      },
    });
  }

  protected onClear(): void {
    this.removeDynamicLine();
    this.removeVertexEntities();
  }

  protected onLeftClick(position: Cartesian3): void {
    // 添加点
    this.addPoint(position);

    // 添加顶点标记
    this.addVertexEntity(position);

    // 更新提示
    if (this.positions.length === 1) {
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
      } else if (this.positions.length === 1) {
        this.showTip(this.tips.bindPoint);
      }

      this.requestRender();
    } else {
      // 没有点时取消绘制
      this.stop();
    }
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    // 双击完成绘制（至少需要2个点）
    if (this.positions.length >= 2) {
      this.complete();
    }
  }

  /**
   * 创建动态线实体
   */
  private createDynamicLine(): void {
    this.dynamicLineEntity = this.viewer.entities.add({
      polyline: {
        positions: new CallbackProperty(() => {
          if (this.positions.length === 0) {
            return [];
          }
          if (this.currentMousePosition) {
            return [...this.positions, this.currentMousePosition];
          }
          return this.positions;
        }, false),
        ...this.style.polyline,
      },
    });
  }

  /**
   * 移除动态线实体
   */
  private removeDynamicLine(): void {
    if (this.dynamicLineEntity) {
      this.viewer.entities.remove(this.dynamicLineEntity);
      this.dynamicLineEntity = null;
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
   * 通过坐标直接绘制线
   * @param options 绘制参数
   * @returns 绘制结果
   */
  drawByPositions(options: DrawByPositionsLineOptions): DrawResult | null {
    const { positions } = options;
    if (!positions || positions.length < 2) {
      console.warn(
        "PolylineDrawer.drawByPositions: at least 2 positions are required",
      );
      return null;
    }

    // 清理之前的绘制
    this.clear();

    // 保存坐标
    this.positions = [...positions];

    // 创建线实体
    this.entity = this.viewer.entities.add({
      polyline: {
        positions: [...this.positions],
        ...this.style.polyline,
      },
    });

    // 创建结果
    const result: DrawResult = {
      entity: this.entity,
      positions: [...this.positions],
      type: this.type,
    };

    // 触发完成回调
    this.options.onComplete?.(result);

    // 请求渲染
    this.requestRender();

    return result;
  }
}
