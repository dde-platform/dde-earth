import { PolygonDrawer, PolylineDrawer } from "@dde-earth/plugin-drawer";

import type { BaseDrawerConfig } from "@dde-earth/plugin-drawer";
import type { Cartesian3 } from "cesium";

export interface RealtimeDrawState {
  committedPositions: Cartesian3[];
  previewPosition: Cartesian3 | null;
}

export type RealtimeUpdateHandler = (state: RealtimeDrawState) => void;

export class RealtimePolylineDrawer extends PolylineDrawer {
  constructor(
    config: BaseDrawerConfig,
    private readonly onUpdate?: RealtimeUpdateHandler,
  ) {
    super(config);
  }

  protected override onStart(): void {
    super.onStart();
    this.notify(null);
  }

  protected override onStop(): void {
    super.onStop();
    this.notify(null);
  }

  protected override onComplete(): void {
    super.onComplete();
    this.notify(null);
  }

  protected override onClear(): void {
    super.onClear();
    this.notify(null);
  }

  protected override onLeftClick(position: Cartesian3): void {
    super.onLeftClick(position);
    this.notify(null);
  }

  protected override onMouseMove(position: Cartesian3): void {
    super.onMouseMove(position);
    this.notify(position);
  }

  protected override onRightClick(position: Cartesian3 | null): void {
    super.onRightClick(position);
    this.notify(null);
  }

  protected override onDoubleClick(position: Cartesian3 | null): void {
    super.onDoubleClick(position);
    this.notify(null);
  }

  private notify(previewPosition: Cartesian3 | null): void {
    this.onUpdate?.({
      committedPositions: [...this.positions],
      previewPosition,
    });
  }
}

export class RealtimePolygonDrawer extends PolygonDrawer {
  constructor(
    config: BaseDrawerConfig,
    private readonly onUpdate?: RealtimeUpdateHandler,
  ) {
    super(config);
  }

  protected override onStart(): void {
    super.onStart();
    this.notify(null);
  }

  protected override onStop(): void {
    super.onStop();
    this.notify(null);
  }

  protected override onComplete(): void {
    super.onComplete();
    this.notify(null);
  }

  protected override onClear(): void {
    super.onClear();
    this.notify(null);
  }

  protected override onLeftClick(position: Cartesian3): void {
    super.onLeftClick(position);
    this.notify(null);
  }

  protected override onMouseMove(position: Cartesian3): void {
    super.onMouseMove(position);
    this.notify(position);
  }

  protected override onRightClick(position: Cartesian3 | null): void {
    super.onRightClick(position);
    this.notify(null);
  }

  protected override onDoubleClick(position: Cartesian3 | null): void {
    super.onDoubleClick(position);
    this.notify(null);
  }

  private notify(previewPosition: Cartesian3 | null): void {
    this.onUpdate?.({
      committedPositions: [...this.positions],
      previewPosition,
    });
  }
}
