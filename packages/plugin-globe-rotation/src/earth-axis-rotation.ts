import { Cartesian3, Matrix3, Matrix4 } from "cesium";

import type { Camera } from "cesium";

const rotation = new Matrix3();
const position = new Cartesian3();
const direction = new Cartesian3();
const up = new Cartesian3();

/**
 * 以相机的反向绕轴运动呈现地球自转；正角度表示地球向东自转，单位为弧度。
 * 同时旋转世界坐标中的位置和方向，保持球心屏幕位置、观察纬度及视锥尺度。
 * 调用方负责确保相机处于三维场景，并同步自己管理的视图状态。
 */
export function rotateAroundEarthAxis(camera: Camera, angle: number): void {
  if (!Number.isFinite(angle) || angle === 0) return;

  Matrix3.fromRotationZ(-angle, rotation);
  Matrix3.multiplyByVector(rotation, camera.positionWC, position);
  Matrix3.multiplyByVector(rotation, camera.directionWC, direction);
  Matrix3.multiplyByVector(rotation, camera.upWC, up);

  // 使用公开的坐标转换接口，保留带有平移或旋转的相机参考系。
  // 不调用 Camera.rotate/setView，避免其自动调整正交视锥宽度。
  const inverseTransform = camera.inverseTransform;
  Matrix4.multiplyByPoint(inverseTransform, position, camera.position);
  Matrix4.multiplyByPointAsVector(
    inverseTransform,
    direction,
    camera.direction,
  );
  Matrix4.multiplyByPointAsVector(inverseTransform, up, camera.up);
  Cartesian3.cross(camera.direction, camera.up, camera.right);
}
