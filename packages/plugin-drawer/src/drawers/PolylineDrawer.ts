import { CallbackProperty, Entity } from "cesium";

import { BaseDrawer } from "./BaseDrawer";
import { DrawingScreenOverlay } from "./screenOverlay";

import type { Cartesian3 } from "cesium";
import type {
  DrawByPositionsLineOptions,
  DrawResult,
  DrawerType,
} from "../types";
import type { ScreenOverlayStyle } from "./screenOverlay";

/**
 * 折线绘制器。
 */
export class PolylineDrawer extends BaseDrawer {
  readonly type: DrawerType = "line";

  private vertexEntities: Entity[] = [];

  private dynamicLineEntity: Entity | null = null;

  private screenOverlay: DrawingScreenOverlay | null = null;

  private readonly syncScreenOverlay = (): void => {
    this.renderScreenOverlay();
  };

  protected onStart(): void {
    this.createDynamicLine();
    this.createScreenOverlay();
  }

  protected onStop(): void {
    this.removeDynamicLine();
    this.removeVertexEntities();
    this.removeScreenOverlay();
  }

  protected onComplete(): void {
    this.removeDynamicLine();
    this.removeVertexEntities();
    this.removeScreenOverlay();

    if (this.positions.length < 2) {
      return;
    }

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
    this.removeScreenOverlay();
  }

  protected onLeftClick(position: Cartesian3): void {
    this.addPoint(position);
    this.addVertexEntity(position);
    this.updateVertexEntityVisibility();
    this.updateDrawingTip();
    this.requestRender();
  }

  protected onMouseMove(position: Cartesian3): void {
    this.currentMousePosition = position;
    this.requestRender();
  }

  protected onRightClick(_: Cartesian3 | null): void {
    if (this.positions.length > 0) {
      this.removeLastPoint();
      this.removeLastVertexEntity();
      this.updateDrawingTip();
      this.requestRender();
    } else {
      this.stop();
    }
  }

  protected onDoubleClick(_: Cartesian3 | null): void {
    const removedDuplicatePoint = this.removeDoubleClickDuplicatePoint();
    if (removedDuplicatePoint) {
      this.removeLastVertexEntity();
    }

    if (this.positions.length >= 2) {
      this.complete();
    } else if (removedDuplicatePoint) {
      this.updateDrawingTip();
      this.requestRender();
    }
  }

  private updateDrawingTip(): void {
    if (this.positions.length === 0) {
      this.showTip(this.tips.init);
    } else if (this.positions.length === 1) {
      this.showTip(this.tips.bindPoint);
    } else {
      this.showTip(this.tips.bindLastPoint);
    }
  }

  private createDynamicLine(): void {
    this.dynamicLineEntity = this.viewer.entities.add({
      polyline: {
        positions: new CallbackProperty(() => {
          if (this.shouldUse2DScreenOverlay() || this.positions.length === 0) {
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

  private removeDynamicLine(): void {
    if (this.dynamicLineEntity) {
      this.viewer.entities.remove(this.dynamicLineEntity);
      this.dynamicLineEntity = null;
    }
  }

  private addVertexEntity(position: Cartesian3): void {
    const entity = this.viewer.entities.add({
      position,
      show: !this.shouldUse2DScreenOverlay(),
      point: {
        ...this.style.point,
        pixelSize: ((this.style.point?.pixelSize as number) || 10) * 0.6,
      },
    });
    this.vertexEntities.push(entity);
  }

  private removeLastVertexEntity(): void {
    const entity = this.vertexEntities.pop();
    if (entity) {
      this.viewer.entities.remove(entity);
    }
  }

  private removeVertexEntities(): void {
    for (const entity of this.vertexEntities) {
      this.viewer.entities.remove(entity);
    }
    this.vertexEntities = [];
  }

  private createScreenOverlay(): void {
    if (this.screenOverlay) {
      return;
    }

    this.screenOverlay = new DrawingScreenOverlay(
      this.viewer.container as HTMLElement,
    );
    this.viewer.scene.postRender.addEventListener(this.syncScreenOverlay);
    this.renderScreenOverlay();
  }

  private removeScreenOverlay(): void {
    if (!this.screenOverlay) {
      return;
    }

    this.viewer.scene.postRender.removeEventListener(this.syncScreenOverlay);
    this.screenOverlay.destroy();
    this.screenOverlay = null;
  }

  private renderScreenOverlay(): void {
    this.updateVertexEntityVisibility();

    if (!this.screenOverlay) {
      return;
    }

    const useOverlay = this.shouldUse2DScreenOverlay();
    this.screenOverlay.setVisible(useOverlay);

    if (!useOverlay) {
      this.screenOverlay.clear();
      return;
    }

    this.screenOverlay.renderPolyline(
      this.getInteractive2DScreenPoints(this.positions.length > 0),
      this.getOverlayStyle(),
    );
  }

  private updateVertexEntityVisibility(): void {
    const visible = !this.shouldUse2DScreenOverlay();
    this.vertexEntities.forEach((entity) => {
      entity.show = visible;
    });
  }

  private getOverlayStyle(): ScreenOverlayStyle {
    return {
      lineColor: resolveCssColor(this.style.polyline?.material, "#ffd700"),
      lineWidth: Number(this.style.polyline?.width ?? 3),
      pointFillColor: resolveCssColor(this.style.point?.color, "#ffd700"),
      pointRadius: Math.max(Number(this.style.point?.pixelSize ?? 10) * 0.3, 2),
      pointStrokeColor: resolveCssColor(
        this.style.point?.outlineColor,
        "#000000",
      ),
      pointStrokeWidth: Number(this.style.point?.outlineWidth ?? 1),
    };
  }

  drawByPositions(options: DrawByPositionsLineOptions): DrawResult | null {
    const { positions } = options;
    if (!positions || positions.length < 2) {
      console.warn(
        "PolylineDrawer.drawByPositions: at least 2 positions are required",
      );
      return null;
    }

    this.clear();
    this.setPoints(positions);

    this.entity = this.viewer.entities.add({
      polyline: {
        positions: [...this.positions],
        ...this.style.polyline,
      },
    });

    const result: DrawResult = {
      entity: this.entity,
      positions: [...this.positions],
      type: this.type,
    };

    this.options.onComplete?.(result);
    this.requestRender();

    return result;
  }
}

function resolveCssColor(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    if ("toCssColorString" in value) {
      const toCssColorString = (value as { toCssColorString?: () => string })
        .toCssColorString;
      if (typeof toCssColorString === "function") {
        return toCssColorString.call(value);
      }
    }

    if ("color" in value) {
      return resolveCssColor((value as { color?: unknown }).color, fallback);
    }
  }

  return fallback;
}
