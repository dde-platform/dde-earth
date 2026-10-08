import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";
import {
  Camera,
  Cartesian3,
  Cartesian4,
  Ellipsoid,
  GeographicProjection,
  MapMode2D,
  Matrix4,
  OrthographicFrustum,
  SceneMode,
  Transforms,
} from "cesium";

// 与浏览器一致使用依赖包的 ESM 构建；测试不读取应用项目的任何模块。
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "dde-earth") {
      return nextResolve(
        new URL("../../dde-earth/dist/es/index.js", import.meta.url).href,
        context,
      );
    }
    return nextResolve(specifier, context);
  },
});
const { GlobeRotation, rotateAroundEarthAxis } = await import(
  "../dist/es/index.js"
);
const { registerCameraControls } = await import("dde-earth");

function fixture() {
  const ellipsoid = Ellipsoid.WGS84;
  const scene = {
    drawingBufferWidth: 1000,
    drawingBufferHeight: 800,
    canvas: { clientWidth: 1000, clientHeight: 800 },
    ellipsoid,
    mapProjection: new GeographicProjection(ellipsoid),
    mode: SceneMode.SCENE3D,
    mapMode2D: MapMode2D.INFINITE_SCROLL,
    screenSpaceCameraController: {
      enableInputs: true,
      minimumZoomDistance: 1,
      maximumZoomDistance: Infinity,
    },
    requestRender() {},
  };
  const camera = new Camera(scene);
  camera.update(SceneMode.SCENE3D);
  camera.setView({
    destination: Cartesian3.fromDegrees(120, 28, 9e6),
    orientation: { heading: 0.3, pitch: -Math.PI * 0.45, roll: 0.15 },
  });
  const viewer = { camera, scene, isDestroyed: () => false };
  const earth = { viewer, i18n: { extend() {}, getT() {} } };
  return { camera, viewer, earth };
}

function center(camera) {
  const eye = Matrix4.multiplyByVector(
    camera.viewMatrix,
    new Cartesian4(0, 0, 0, 1),
    new Cartesian4(),
  );
  const clip = Matrix4.multiplyByVector(
    camera.frustum.projectionMatrix,
    eye,
    new Cartesian4(),
  );
  return [500 * (1 + clip.x / clip.w), 400 * (1 - clip.y / clip.w)];
}

function close(actual, expected, tolerance = 1e-7) {
  assert.ok(
    Math.abs(actual - expected) < tolerance,
    `${actual} != ${expected}`,
  );
}

for (const orthographic of [false, true]) {
  for (const transformed of [false, true]) {
    test(`地轴旋转保持球心、尺度和纬度：orthographic=${orthographic}, transformed=${transformed}`, () => {
      const { camera } = fixture();
      if (transformed) {
        camera.lookAtTransform(
          Transforms.eastNorthUpToFixedFrame(
            Cartesian3.fromDegrees(35, 55, 2e5),
          ),
        );
      }
      if (orthographic) {
        camera.frustum = new OrthographicFrustum({
          width: 2e7,
          aspectRatio: 1.25,
          near: 1,
          far: 1e9,
        });
      }
      const initial = {
        center: center(camera),
        latitude: camera.positionCartographic.latitude,
        height: camera.positionCartographic.height,
        longitude: camera.positionCartographic.longitude,
        distance: Cartesian3.magnitude(camera.positionWC),
        position: Cartesian3.clone(camera.positionWC),
        direction: Cartesian3.clone(camera.directionWC),
        up: Cartesian3.clone(camera.upWC),
        transform: Matrix4.clone(camera.transform),
        frustum: camera.frustum.clone(),
      };
      const increment = Math.PI / 180;
      for (let frame = 0; frame < 360; frame++) {
        rotateAroundEarthAxis(camera, increment);
        const current = center(camera);
        close(current[0], initial.center[0], 0.01);
        close(current[1], initial.center[1], 0.01);
        close(camera.positionCartographic.latitude, initial.latitude);
        close(camera.positionCartographic.height, initial.height, 1e-5);
        close(Cartesian3.magnitude(camera.positionWC), initial.distance, 1e-5);
        assert.ok(Matrix4.equals(camera.transform, initial.transform));
        assert.ok(camera.frustum.equals(initial.frustum));
        if (frame === 0) {
          close(
            camera.positionCartographic.longitude,
            initial.longitude - increment,
          );
        }
      }
      assert.ok(
        Cartesian3.equalsEpsilon(camera.positionWC, initial.position, 1e-11),
      );
      assert.ok(
        Cartesian3.equalsEpsilon(camera.directionWC, initial.direction, 1e-11),
      );
      assert.ok(Cartesian3.equalsEpsilon(camera.upWC, initial.up, 1e-11));
    });
  }
}

test("显式注入自转实现，独立于导航注册；暂停、停用和销毁时停止调用", (t) => {
  const frames = new Map();
  let id = 0;
  const originalRequest = globalThis.requestAnimationFrame;
  const originalCancel = globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame = (callback) => {
    frames.set(++id, callback);
    return id;
  };
  globalThis.cancelAnimationFrame = (frame) => frames.delete(frame);
  t.after(() => {
    if (originalRequest) globalThis.requestAnimationFrame = originalRequest;
    else delete globalThis.requestAnimationFrame;
    if (originalCancel) globalThis.cancelAnimationFrame = originalCancel;
    else delete globalThis.cancelAnimationFrame;
  });
  function tick() {
    assert.equal(frames.size, 1, "每个插件最多保留一个动画回调");
    const [frame, callback] = frames.entries().next().value;
    frames.delete(frame);
    callback(0);
  }

  const { earth, viewer, camera } = fixture();
  const unregister = registerCameraControls(viewer, {
    rotate() {
      assert.fail("地球自转不能隐式调用导航接口");
    },
  });
  t.after(unregister);
  const received = [];
  const plugin = new GlobeRotation().init(earth, {
    autoStart: true,
    rotationSpeed: 0.06,
    rotationStep(target, angle) {
      received.push([target, angle]);
    },
  });
  t.after(() => plugin.destroy());
  const position = Cartesian3.clone(camera.positionWC);
  tick();
  assert.equal(received[0][0], viewer);
  close(received[0][1], 0.01);
  assert.ok(
    Cartesian3.equals(camera.positionWC, position),
    "注入后不能叠加默认旋转",
  );

  viewer.scene.screenSpaceCameraController.enableInputs = false;
  tick();
  assert.equal(received.length, 1);
  viewer.scene.screenSpaceCameraController.enableInputs = true;
  for (const mode of [
    SceneMode.MORPHING,
    SceneMode.SCENE2D,
    SceneMode.COLUMBUS_VIEW,
  ]) {
    viewer.scene.mode = mode;
    tick();
    assert.equal(received.length, 1);
  }
  viewer.scene.mode = SceneMode.SCENE3D;
  plugin.startRotation(0.03);
  tick();
  close(received[1][1], 0.005);
  plugin.stopRotation();
  assert.equal(frames.size, 0);
  plugin.destroy();
  assert.equal(frames.size, 0);
  assert.equal(plugin.isDestroyed, true);

  const defaultPlugin = new GlobeRotation().init(earth);
  const before = center(camera);
  defaultPlugin.startRotation();
  tick();
  assert.ok(!Cartesian3.equals(camera.positionWC, position));
  close(center(camera)[0], before[0], 0.01);
  close(center(camera)[1], before[1], 0.01);
  defaultPlugin.destroy();
  assert.equal(frames.size, 0);

  const disposingPlugin = new GlobeRotation().init(earth, {
    rotationStep() {
      disposingPlugin.destroy();
    },
  });
  disposingPlugin.startRotation();
  tick();
  assert.equal(frames.size, 0, "回调中销毁插件后不能重新排队");
  disposingPlugin.startRotation();
  assert.equal(frames.size, 0, "销毁后的插件不能重新启动");

  const destroyingViewerPlugin = new GlobeRotation().init(earth, {
    rotationStep() {
      viewer.isDestroyed = () => true;
      viewer.scene.requestRender = () => assert.fail("不能渲染已销毁的 Viewer");
    },
  });
  destroyingViewerPlugin.startRotation();
  tick();
  assert.equal(frames.size, 0);
  destroyingViewerPlugin.destroy();
});
