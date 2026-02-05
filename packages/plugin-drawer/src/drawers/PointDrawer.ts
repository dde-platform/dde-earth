import { BaseDrawer } from "./BaseDrawer";

import type { Entity } from "cesium";
import type { Cartesian3 } from "cesium";
import type {
  DrawByPositionsPointOptions,
  DrawResult,
  DrawerType,
} from "../types";

/**
 * 点绘制器
 * 单击添加点，再次单击完成绘制
 */
export class PointDrawer extends BaseDrawer {
  readonly type: DrawerType = "point";

  /** 预览点实体 */
  private previewEntity: Entity | null = null;

  protected onStart(): void {
    // 创建预览点
    this.createPreviewPoint();
  }

  protected onStop(): void {
    this.removePreviewPoint();
  }

  protected onComplete(): void {
    // 移除预览点
    this.removePreviewPoint();

    // 创建最终的点实体
    if (this.positions.length > 0) {
      this.entity = this.viewer.entities.add({
        position: this.positions[0],
        point: this.style.point,
      });
    }
  }

  protected onClear(): void {
    this.removePreviewPoint();
  }

  protected onLeftClick(position: Cartesian3): void {
    // 添加点并完成绘制
    this.addPoint(position);
    this.complete();
  }

  protected onMouseMove(position: Cartesian3): void {
    // 更新预览点位置
    if (this.previewEntity && this.previewEntity.position) {
      (this.previewEntity.position as any).setValue(position);
      this.requestRender();
    }

    // 更新提示
    this.showTip(this.tips.init);
  }

  protected onRightClick(_: Cartesian3 | null): void {
    // 点绘制时右键取消
    this.stop();
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    // 点绘制不需要处理双击
  }

  /**
   * 创建预览点
   */
  private createPreviewPoint(): void {
    this.previewEntity = this.viewer.entities.add({
      point: {
        ...this.style.point,
        pixelSize: (this.style.point?.pixelSize as number) * 0.8 || 8,
      },
    });
  }

  /**
   * 移除预览点
   */
  private removePreviewPoint(): void {
    if (this.previewEntity) {
      this.viewer.entities.remove(this.previewEntity);
      this.previewEntity = null;
    }
  }

  /**
   * 通过坐标直接绘制点
   * @param options 绘制参数
   * @returns 绘制结果
   */
  drawByPositions(options: DrawByPositionsPointOptions): DrawResult | null {
    const { position } = options;
    if (!position) {
      console.warn("PointDrawer.drawByPositions: position is required");
      return null;
    }

    // 清理之前的绘制
    this.clear();

    // 保存坐标
    this.positions = [position];

    // 创建点实体
    this.entity = this.viewer.entities.add({
      position,
      point: this.style.point,
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
