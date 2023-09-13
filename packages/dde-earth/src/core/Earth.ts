import {
  Cartesian3,
  Math as CesiumMath,
  Color,
  SceneMode,
  Viewer,
} from 'cesium';

import { EarthOptions } from '../typings';
import { PluginManager } from './PluginManager';

export class Earth {
  public readonly viewer: Viewer;
  public readonly options: EarthOptions;
  public readonly pluginManager: PluginManager;
  private _destroyed: boolean = false;

  constructor(
    public readonly container: string | Element,
    options?: EarthOptions,
  ) {
    this.options = {
      ...Earth.defaultOptions,
      ...options,
    };
    this.viewer = new Viewer(container, this.options);
    this.resetStatus();
    this.pluginManager = new PluginManager(this);
  }

  get destroyed() {
    return this._destroyed;
  }

  /**
   * Get or set the scene display mode
   * @default SceneMode.SCENE3D
   */
  get sceneMode() {
    return this.viewer.scene.mode;
  }

  set sceneMode(mode: SceneMode) {
    switch (mode) {
      case SceneMode.COLUMBUS_VIEW:
        this.viewer.scene.morphToColumbusView(0);
        break;
      case SceneMode.SCENE2D:
        this.viewer.scene.morphTo2D(0);
        break;
      case SceneMode.SCENE3D:
        this.viewer.scene.morphTo3D(0);
        break;
      default:
        this.viewer.scene.morphTo3D(0);
        break;
    }
  }

  resetStatus() {
    const scene = this.viewer.scene;
    scene.fog.density = 0.0001; // 雾气中水分含量
    scene.globe.enableLighting = false;
    scene.moon.show = false;
    scene.sun.show = false;
    scene.skyBox.show = false;
    scene.backgroundColor = Color.fromCssColorString(
      this.options.backgroundColor as string,
    );
    scene.globe.baseColor = Color.fromCssColorString(
      this.options.baseColor as string,
    );
    this.resetView();
  }

  resetView(viewPort = this.options.defaultViewPort as number[]) {
    this.viewer.camera.setView({
      destination: Cartesian3.fromDegrees(
        viewPort[0],
        viewPort[1],
        viewPort[2],
      ),
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: CesiumMath.toRadians(0),
      },
    });
  }

  destroy() {
    this.viewer.destroy();
    this.pluginManager.destory();
    this._destroyed = true;
  }
}

export namespace Earth {
  export const defaultOptions: EarthOptions = {
    backgroundColor: '#00000099',
    baseColor: '#4F4F4F',
    defaultViewPort: [116.3, 39.9, 20000000],

    baseLayerPicker: false,
    animation: false,
    fullscreenButton: false,
    geocoder: false,
    infoBox: false,
    homeButton: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    shouldAnimate: true,
    requestRenderMode: true,
    maximumRenderTimeChange: Infinity,
    useBrowserRecommendedResolution: false,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
      },
    },
  };

  export type Plugin = {
    /** plugin name, do not repeat, will appear in warnings or errors */
    name: string;
    /** get or set plugin's enable */
    get enable(): boolean;
    set enable(val: boolean);
    get destroyed(): boolean;

    init(earth: Earth, ...options: any[]): Plugin;
    destroy(): void;
  };
}
