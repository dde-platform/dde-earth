import {
  Cartesian3,
  Math as CesiumMath,
  Color,
  SceneMode,
  Viewer,
} from "cesium";

import { I18N } from "../i18n";
import { EventEmitter } from "./event";
import { LayerManager } from "./layerManager";
import { PluginManager } from "./pluginManager";
import { TerrainManager } from "./terrainManager";

import type { LayerItem } from "./layerItem";
import type { IPlugin } from "./plugin";

export class Earth {
  private _isDestroyed: boolean = false;
  private _ready: boolean = false;
  readonly viewer: Viewer;
  readonly options: Earth.EarthOptions;
  readonly pluginManager: PluginManager;
  readonly i18n: I18N;
  readonly layerManager: LayerManager;
  readonly eventEmitter: EventEmitter;
  readonly terrainManager: TerrainManager;

  constructor(
    readonly container: string | Element | Viewer,
    options?: Earth.EarthOptions,
  ) {
    this.options = {
      ...Earth.defaultOptions,
      ...options,
    };
    this.viewer =
      container instanceof Viewer
        ? container
        : new Viewer(container, this.options);
    this.resetStatus();

    this.eventEmitter = new EventEmitter();
    this.emit = this.eventEmitter.emit.bind(this.eventEmitter);

    this.i18n = new I18N({
      ...this.options.toolOptions?.i18n,
      onLocaleChanged: (locale) => {
        this.emit("lang:change", locale);
        this.options.toolOptions?.i18n?.onLocaleChanged?.(locale);
      },
    });

    this.layerManager = new LayerManager(this, {
      baseLayer: this.options.baseLayer,
    });
    this.addLayer = this.layerManager.addLayer.bind(this.layerManager);
    this.removeLayer = this.layerManager.removeLayer.bind(this.layerManager);

    this.terrainManager = new TerrainManager(this);
    this.setTerrain = this.terrainManager.setTerrain.bind(this.terrainManager);

    this.pluginManager = new PluginManager(this);
    this.usePlugin = this.pluginManager.use.bind(this.pluginManager);
    this.getPlugin = this.pluginManager.get.bind(this.pluginManager);
    this.removePlugin = this.pluginManager.remove.bind(this.pluginManager);
    options?.plugins?.map(this.usePlugin);

    this._ready = true;
  }

  get ready() {
    return this._ready;
  }

  get isDestroyed() {
    return this._isDestroyed;
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
    const plugin = this.pluginManager?.getPluginWithEvent(event);
    plugin?.on(event, fn);
    this.eventEmitter.on(event, fn);
  }

  off<T extends Earth.EventTypes = Earth.EventTypes>(
    event: T,
    fn?: Earth.EventFunc<T>,
  ): any {
    const plugin = this.pluginManager?.getPluginWithEvent(event);
    plugin?.off(event, fn);
    this.eventEmitter.off(event, fn);
  }

  emit: (typeof EventEmitter.prototype)["emit"];

  usePlugin: (typeof PluginManager.prototype)["use"];
  getPlugin: (typeof PluginManager.prototype)["get"];
  removePlugin: (typeof PluginManager.prototype)["remove"];

  /** add layer using layer loader */
  addLayer: (typeof LayerManager.prototype)["addLayer"];
  removeLayer: (typeof LayerManager.prototype)["removeLayer"];

  /** set terrain using terrain loader */
  setTerrain: (typeof TerrainManager.prototype)["setTerrain"];

  destroy() {
    this.pluginManager.destroy();
    this.layerManager.destroy();
    this.viewer.destroy();
    this._isDestroyed = true;
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
    backgroundColor: "#00000099",
    baseColor: "#4F4F4F",
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
    useBrowserRecommendedResolution: false,
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true,
      },
    },
  };

  export interface Events {
    "layer:add": [layerItem: LayerItem];
    "layer:remove": [id: string];
    "layer:render": [layerItem: LayerItem];
    "lang:change": [lang: string];
    "terrain:change": [terrain: any];
  }

  export type EventTypes = keyof Events;

  export type EventFunc<T extends keyof Events = keyof Events> = (
    ...args: Events[T]
  ) => void;

  export interface AddLayerOptions {
    zoom?: boolean;
  }
}
