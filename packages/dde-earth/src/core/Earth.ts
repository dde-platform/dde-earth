import {
  Cartesian3,
  Math as CesiumMath,
  Color,
  SceneMode,
  Viewer,
} from 'cesium';

import { Subscriber } from '../plugins/Subscriber';
import { EventEmitter } from './event';
import { BasePlugin } from './plugin';
import { PluginManager } from './pluginManager';

export class Earth {
  private _destroyed: boolean = false;
  public readonly viewer: Viewer;
  public readonly options: Earth.EarthOptions;
  public readonly eventEmitter: EventEmitter;
  public readonly plugins: Record<string, BasePlugin> = {};
  public readonly pluginManager: PluginManager;
  public readonly builtInPlugins: Record<string, BasePlugin> = {};
  public readonly builtInPluginManager: PluginManager;

  constructor(
    public readonly container: string | Element,
    options?: Earth.EarthOptions,
  ) {
    this.options = {
      ...Earth.defaultOptions,
      ...options,
    };
    this.viewer = new Viewer(container, this.options);
    this.resetStatus();
    this.eventEmitter = new EventEmitter();
    this.on = this.eventEmitter.on.bind(this.eventEmitter);
    this.off = this.eventEmitter.off.bind(this.eventEmitter);
    this.emit = this.eventEmitter.emit.bind(this.eventEmitter);
    this.pluginManager = new PluginManager(this, this.plugins);
    this.usePlugin = this.pluginManager.use.bind(this.pluginManager);
    this.getPlugin = this.pluginManager.get.bind(this.pluginManager);
    this.removePlugin = this.pluginManager.remove.bind(this.pluginManager);
    this.builtInPluginManager = new PluginManager(this, this.builtInPlugins);
    this._registerBuiltInPlugins();
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

  private _registerBuiltInPlugins() {
    this.builtInPluginManager.use(new Subscriber(), {
      pickResult: {
        enable: true,
        moveDebounce: 100,
      },
    });
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

  on: (typeof EventEmitter.prototype)['on'];
  off: (typeof EventEmitter.prototype)['off'];
  emit: (typeof EventEmitter.prototype)['emit'];

  usePlugin: (typeof PluginManager.prototype)['use'];
  getPlugin: (typeof PluginManager.prototype)['get'];
  removePlugin: (typeof PluginManager.prototype)['remove'];

  destroy() {
    this.viewer.destroy();
    this.pluginManager.destroy();
    this.builtInPluginManager.destroy();
    this.eventEmitter.destroy();
    this._destroyed = true;
  }
}

export namespace Earth {
  export type EarthOptions = {
    /** plugins list */
    plugins?: BasePlugin[];
    /**
     * scene background color
     * @default'#00000099'
     */
    backgroundColor?: string;
    /**
     * globe base color
     * @default'#4F4F4F'
     */
    baseColor?: string;
    /**
     * default viewport
     * @default[116.3, 39.9, 20000000]
     */
    defaultViewPort?: number[];
  } & Viewer.ConstructorOptions;

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
}
