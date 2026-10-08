import { Event } from "cesium";

import type { Cartesian2, Cartesian3, Viewer } from "cesium";

/** 特殊视图对现有导航操作的适配；没有适配器时继续使用 Cesium 默认行为。 */
export interface CameraControls {
  readonly heading: number;
  zoom(factor: number, anchor?: Cartesian2): void;
  pan(deltaX: number, deltaY: number): void;
  rotate(angle: number): void;
  reset(): void;
  resetHeading(): void;
  focus(positions: readonly Cartesian3[]): void;
}

const controls = new WeakMap<Viewer, CameraControls>();
const viewEvents = new WeakMap<Viewer, Event>();

export function getCameraControls(viewer: Viewer) {
  return controls.get(viewer);
}

export function registerCameraControls(
  viewer: Viewer,
  adapter: CameraControls,
) {
  controls.set(viewer, adapter);
  return () => {
    // 旧视图的清理不能卸载后注册的新视图。
    if (controls.get(viewer) === adapter) controls.delete(viewer);
  };
}

/** 正交缩放不会触发三维 camera.changed，使用独立事件通知尺度相关功能。 */
export function cameraViewChanged(viewer: Viewer): Event {
  let event = viewEvents.get(viewer);
  if (!event) {
    event = new Event();
    viewEvents.set(viewer, event);
  }
  return event;
}

export function notifyCameraViewChanged(viewer: Viewer) {
  if (viewer.isDestroyed()) return;
  viewer.scene.requestRender();
  viewEvents.get(viewer)?.raiseEvent();
}
