import { LabelCollection } from "cesium";

import { DEFAULT_DRAWER_GRAPH_OPTIONS } from "../config";
import { RealtimePolygonDrawer } from "./realtime-drawers";
import {
  calculateCentroid,
  calculatePolygonArea,
  convertAreaValue,
} from "./utils";

import type { Cartesian3, Viewer } from "cesium";
import type {
  MeasureTool,
  MeasureType,
  ResolvedMeasureOptions,
} from "../types";

export class AreaMeasureTool implements MeasureTool {
  readonly type: MeasureType;

  private readonly labels: LabelCollection;

  private readonly drawer: RealtimePolygonDrawer;

  private destroyed = false;

  constructor(
    private readonly viewer: Viewer,
    type: MeasureType,
    private readonly options: ResolvedMeasureOptions,
  ) {
    this.type = type;
    this.labels = new LabelCollection({ scene: this.viewer.scene });
    this.viewer.scene.primitives.add(this.labels);

    this.drawer = new RealtimePolygonDrawer(
      {
        viewer: this.viewer,
        options: {
          keepAfterComplete: true,
          showTips: true,
          style: {
            point: { ...DEFAULT_DRAWER_GRAPH_OPTIONS.POINT },
            polyline: {
              ...DEFAULT_DRAWER_GRAPH_OPTIONS.POLYLINE,
              ...(this.options.renderingOptions.polyline ?? {}),
            },
            polygon: {
              ...DEFAULT_DRAWER_GRAPH_OPTIONS.POLYGON,
              ...(this.options.renderingOptions.polygon ?? {}),
            },
          },
          tips: {
            init: this.options.drawerOptions.tips.init,
            bindPoint: this.options.drawerOptions.tips.start,
            bindLastPoint: this.options.drawerOptions.tips.start,
          },
          onCancel: () => {
            this.labels.removeAll();
            this.requestRender();
          },
          onComplete: (result) => {
            this.updateAreaLabel(result.positions, null);
            this.options.onEnd?.(result.entity);
          },
        },
      },
      ({ committedPositions, previewPosition }) => {
        this.updateAreaLabel(committedPositions, previewPosition);
      },
    );
  }

  start(): void {
    if (this.destroyed) {
      return;
    }

    this.drawer.start();
  }

  end(): void {
    if (this.destroyed) {
      return;
    }

    this.drawer.clear();
    this.labels.removeAll();
    this.requestRender();
  }

  destroy(): void {
    if (this.destroyed) {
      return;
    }

    this.end();
    this.drawer.destroy();

    if (!this.viewer.isDestroyed()) {
      this.viewer.scene.primitives.remove(this.labels);
    }

    this.destroyed = true;
  }

  private updateAreaLabel(
    committedPositions: Cartesian3[],
    previewPosition: Cartesian3 | null,
  ): void {
    const positions = previewPosition
      ? [...committedPositions, previewPosition]
      : [...committedPositions];

    this.labels.removeAll();
    if (positions.length < 3) {
      this.requestRender();
      return;
    }

    const area = calculatePolygonArea(this.viewer, positions);
    const unitedArea = convertAreaValue(area, this.options.units);
    const centroid = calculateCentroid(positions);
    if (!centroid) {
      this.requestRender();
      return;
    }

    this.labels.add({
      position: centroid,
      ...this.options.labelStyle,
      text: `${this.options.locale.area}: ${this.options.locale.formatArea(
        area,
        unitedArea,
        this.options.units,
      )}`,
    });

    this.requestRender();
  }

  private requestRender(): void {
    this.viewer.scene.requestRender();
  }
}
