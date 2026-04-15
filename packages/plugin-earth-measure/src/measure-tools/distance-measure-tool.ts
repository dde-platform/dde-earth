import { LabelCollection } from "cesium";

import { DEFAULT_DRAWER_GRAPH_OPTIONS } from "../config";
import { RealtimePolylineDrawer } from "./realtime-drawers";
import { calculateSegmentDistance, convertLengthValue } from "./utils";

import type { Cartesian3, Viewer } from "cesium";
import type {
  MeasureTool,
  MeasureType,
  ResolvedMeasureOptions,
} from "../types";

export class DistanceMeasureTool implements MeasureTool {
  readonly type: MeasureType;

  private readonly labels: LabelCollection;

  private readonly drawer: RealtimePolylineDrawer;

  private destroyed = false;

  constructor(
    private readonly viewer: Viewer,
    type: MeasureType,
    private readonly options: ResolvedMeasureOptions,
  ) {
    this.type = type;
    this.labels = new LabelCollection({ scene: this.viewer.scene });
    this.viewer.scene.primitives.add(this.labels);

    this.drawer = new RealtimePolylineDrawer(
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
            this.updateDistanceLabels(result.positions, null);
            this.options.onEnd?.(result.entity);
          },
        },
      },
      ({ committedPositions, previewPosition }) => {
        this.updateDistanceLabels(committedPositions, previewPosition);
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

  private updateDistanceLabels(
    committedPositions: Cartesian3[],
    previewPosition: Cartesian3 | null,
  ): void {
    const positions =
      previewPosition && committedPositions.length > 0
        ? [...committedPositions, previewPosition]
        : [...committedPositions];

    this.labels.removeAll();
    if (positions.length === 0) {
      this.requestRender();
      return;
    }

    const labels = positions.map((position) =>
      this.labels.add({
        position,
        ...this.options.labelStyle,
      }),
    );

    let totalDistance = 0;

    for (let index = 0; index < positions.length; index += 1) {
      const label = labels[index];
      if (index === 0) {
        label.text = this.options.locale.start;
        continue;
      }

      const segmentDistance = calculateSegmentDistance(
        positions[index - 1],
        positions[index],
      );
      totalDistance = Number((totalDistance + segmentDistance).toFixed(2));

      const unitedDistance = convertLengthValue(
        totalDistance,
        this.options.units,
      );
      const unitedSegmentDistance = convertLengthValue(
        segmentDistance,
        this.options.units,
      );

      const prefix =
        index === positions.length - 1 ? `${this.options.locale.total}: ` : "";
      let labelText =
        prefix +
        this.options.locale.formatLength(
          totalDistance,
          unitedDistance,
          this.options.units,
        );

      // 保留旧版体验：从第三个点开始显示“本段增量”。
      if (index > 1) {
        labelText += `\n(+${this.options.locale.formatLength(
          segmentDistance,
          unitedSegmentDistance,
          this.options.units,
        )})`;
      }

      label.text = labelText;
    }

    this.requestRender();
  }

  private requestRender(): void {
    this.viewer.scene.requestRender();
  }
}
