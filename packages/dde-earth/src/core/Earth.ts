import {
  Cartesian3,
  Math as CesiumMath,
  Color,
  SceneMode,
  Viewer,
} from 'cesium';

import { I18N } from '../i18n';
import { IPlugin } from './plugin';
import { PluginManager } from './pluginManager';

export class Earth {
  private _destroyed: boolean = false;
  public readonly viewer: Viewer;
  public readonly options: Earth.EarthOptions;
  public readonly plugins: Record<string, IPlugin> = {};
  public readonly pluginManager: PluginManager;
  public readonly i18n: I18N;

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
    this.pluginManager = new PluginManager(this, this.plugins);
    this.i18n = new I18N(this.options.toolOptions?.i18n);
    this.usePlugin = this.pluginManager.use.bind(this.pluginManager);
    this.getPlugin = this.pluginManager.get.bind(this.pluginManager);
    this.removePlugin = this.pluginManager.remove.bind(this.pluginManager);
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

  on<T extends Earth.EventTypes = Earth.EventTypes>(
    event: T,
    fn: Earth.EventFunc<T>,
  ): any {
    const plugin = this.pluginManager.getPluginWithEvent(event);
    plugin?.on(event, fn);
  }

  off<T extends Earth.EventTypes = Earth.EventTypes>(
    event: T,
    fn?: Earth.EventFunc<T>,
  ): any {
    const plugin = this.pluginManager.getPluginWithEvent(event);
    plugin?.off(event, fn);
  }

  usePlugin: (typeof PluginManager.prototype)['use'];
  getPlugin: (typeof PluginManager.prototype)['get'];
  removePlugin: (typeof PluginManager.prototype)['remove'];

  destroy() {
    this.viewer.destroy();
    this.pluginManager.destroy();
    this._destroyed = true;
  }
}

export namespace Earth {
  export type EarthOptions = {
    /** plugins list */
    plugins?: IPlugin[];
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
    toolOptions?: {
      i18n?: Partial<I18N.Options>;
    };
  } & Viewer.ConstructorOptions;

  export const defaultOptions: EarthOptions = {
    backgroundColor: '#00000099',
    baseColor: '#4F4F4F',
    defaultViewPort: [116.3, 39.9, 20000000],

    baseLayerPicker: false,
    baseLayer: false,
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

  export interface Events {}

  export type EventTypes = keyof Events;

  export type EventFunc<T extends keyof Events = keyof Events> = (
    ...args: Events[T]
  ) => void;
}
