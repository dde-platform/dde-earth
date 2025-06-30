import { Cartesian3 } from "cesium";
import { BasePlugin } from "dde-earth";

import Compass from "./Compass";
import ZoomController from "./ZoomController";
import { StyleManager } from "./styles/StyleManager";
import { themeManager } from "./theme";

import type { Earth } from "dde-earth";
import type { NavigatorTheme } from "./theme";

export class Navigator extends BasePlugin {
  name = "Navigator";
  compass!: Compass;
  zoomControl!: ZoomController;
  private styleManager!: StyleManager;
  private themeUnsubscribe?: () => void;
  private initOptions?: Navigator.Options;

  constructor(options?: Navigator.Options) {
    super(options);
    this.initOptions = options;
  }

  get enable() {
    return this.compass.enabled;
  }

  set enable(val: boolean) {
    this.compass.enabled = val;
    this.zoomControl.enabled = val;
  }

  hide() {
    this.compass.hide();
    this.zoomControl.hide();
  }

  show() {
    this.compass.show();
    this.zoomControl.show();
  }

  init(earth: Earth, options?: Navigator.Options) {
    // Merge constructor options with init options, init options take precedence
    const mergedOptions = { ...this.initOptions, ...options };
    this._init(earth);

    // Initialize style manager
    this.styleManager = new StyleManager();

    // Setup theme system
    if (mergedOptions?.theme) {
      this.setTheme(mergedOptions.theme);
    }

    // Subscribe to theme changes and update styles
    this.themeUnsubscribe = themeManager.onThemeChange((theme) => {
      this.styleManager.updateStyles(theme);
    });

    // Apply initial theme
    this.styleManager.updateStyles(themeManager.getTheme());

    const defaultView = earth.options.defaultViewPort as number[];
    this.compass = new Compass(earth.viewer, mergedOptions?.compass);
    this.zoomControl = new ZoomController(earth.viewer, {
      home: Cartesian3.fromDegrees(
        defaultView[0],
        defaultView[1],
        defaultView[2],
      ),
      ...mergedOptions?.zoomControl,
    });
    return this;
  }

  destroy(): void {
    this.compass.destroy();
    this.zoomControl.destroy();
    this.styleManager.destroy();
    if (this.themeUnsubscribe) {
      this.themeUnsubscribe();
    }
  }

  /**
   * Set navigator theme
   * @param theme Theme configuration or preset name
   */
  setTheme(theme: NavigatorTheme | "light" | "dark") {
    themeManager.setTheme(theme);
  }

  /**
   * Update specific theme properties
   * @param updates Partial theme configuration to update
   */
  updateTheme(updates: Partial<NavigatorTheme>) {
    themeManager.updateTheme(updates);
  }

  /**
   * Get current theme configuration
   */
  getTheme(): NavigatorTheme {
    return themeManager.getTheme();
  }
}

export namespace Navigator {
  export interface Options extends BasePlugin.Options {
    theme?: NavigatorTheme | "light" | "dark";
    zoomControl?: {
      container?: Element;
      home?: Cartesian3;
      tips?: {
        zoomIn?: string;
        zoomOut?: string;
        refresh?: string;
      };
    };
    compass?: {
      container?: Element;
      tips?: {
        inner?: string;
        outer?: string;
      };
      theme?: NavigatorTheme | "light" | "dark";
    };
  }
}
