import {
  AreaMeasure,
  AreaSurfaceMeasure,
  DistanceMeasure,
  DistanceSurfaceMeasure,
} from "@cesium-extends/measure";
import { BasePlugin } from "dde-earth";

import { DEFAULT_MEASURE_OPTIONS } from "./config";
import { MeasureOptions, MeasureRenderingOptions } from "./types";

import type { Earth } from "dde-earth";

export class EarthMeasure extends BasePlugin {
  name = "Measure";
  private _measure:
    | DistanceMeasure
    | DistanceSurfaceMeasure
    | AreaMeasure
    | AreaSurfaceMeasure
    | null = null;

  private _measureType:
    | "distance"
    | "distanceSurface"
    | "area"
    | "areaSurface"
    | null = null;

  private _customMeasureOptions: MeasureOptions = {};

  private _customRenderingOptions: MeasureRenderingOptions = {};

  // 保存事件监听器引用，用于正确移除
  private _langChangeHandler: (() => void) | null = null;

  get currentMeasureTool() {
    return this._measure;
  }

  init(earth: Earth) {
    this._init(earth);
    // 监听语言切换事件，保存引用以便后续移除
    this._langChangeHandler = () => {
      this.updateLanguage();
    };
    earth.on("lang:change", this._langChangeHandler);
    //this.graticule = new CesiumGraticule(earth.viewer, options?.graticule);
    return this;
  }

  setMeasure(
    type: "distance" | "distanceSurface" | "area" | "areaSurface",
    options: MeasureOptions,
  ) {
    this._measureType = type;
    this._customMeasureOptions = options;
    this._customRenderingOptions = options.renderingOptions ?? {};
    switch (type) {
      case "distance":
        this._measure = new DistanceMeasure(this.earth.viewer, {
          ...DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale],
          ...options,
        });
        break;
      case "distanceSurface":
        this._measure = new DistanceSurfaceMeasure(this.earth.viewer, {
          ...DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale],
          ...options,
        });
        break;
      case "area":
        this._measure = new AreaMeasure(this.earth.viewer, {
          ...DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale],
          ...options,
        });
        break;
      case "areaSurface":
        this._measure = new AreaSurfaceMeasure(this.earth.viewer, {
          ...DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale],
          ...options,
        });
        break;
      default:
        this._measure = new DistanceMeasure(this.earth.viewer, {
          ...DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale],
          ...options,
        });
        break;
    }
  }

  removeMeasure() {
    this._measure?.end();
    this._measure?.destroy();
    this._measure = null;
    this._measureType = null;
    this._customMeasureOptions = {};
    this._customRenderingOptions = {};
  }

  start() {
    if (!this._measure) return;
    if (
      this._measureType === "distance" ||
      this._measureType === "distanceSurface"
    ) {
      console.log("start", this._customRenderingOptions.polyline);
      (this._measure as DistanceMeasure | DistanceSurfaceMeasure).start(
        this._customRenderingOptions.polyline
          ? { ...this._customRenderingOptions.polyline }
          : {},
      );
    } else {
      console.log("start", this._customRenderingOptions.polygon);
      (this._measure as AreaMeasure | AreaSurfaceMeasure).start(
        this._customRenderingOptions.polygon ?? {},
      );
    }
  }

  end() {
    if (!this._measure) return;
    this._measure.end();
  }

  updateLanguage() {
    if (this._measureType && this._measure) {
      this.removeMeasure();
      this.setMeasure(this._measureType, this._customMeasureOptions);
    }
  }

  destroy(): void {
    // 调用父类的destroy方法
    super.destroy();

    // 销毁测量工具
    this._measure?.destroy();
    this._measure = null;
    this._measureType = null;
    this._customMeasureOptions = {};
    this._customRenderingOptions = {};

    // 正确移除事件监听器
    if (this._langChangeHandler) {
      this.earth.off("lang:change", this._langChangeHandler);
      this._langChangeHandler = null;
    }
  }
}
