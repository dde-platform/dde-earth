import { BasePlugin } from "dde-earth";

import { DEFAULT_LABEL_STYLE, DEFAULT_MEASURE_OPTIONS } from "./config";
import { AreaMeasureTool, DistanceMeasureTool } from "./measure-tools";

import type { Earth } from "dde-earth";
import type {
  MeasureOptions,
  MeasureTool,
  MeasureType,
  ResolvedMeasureOptions,
} from "./types";

export class EarthMeasure extends BasePlugin {
  name = "Measure";

  private _measure: MeasureTool | null = null;

  private _measureType: MeasureType | null = null;

  private _customMeasureOptions: MeasureOptions = {};

  private _langChangeHandler: (() => void) | null = null;

  get currentMeasureTool(): MeasureTool | null {
    return this._measure;
  }

  init(earth: Earth): this {
    this._init(earth);

    this._langChangeHandler = () => {
      this.updateLanguage();
    };
    earth.on("lang:change", this._langChangeHandler);

    return this;
  }

  setMeasure(type: MeasureType, options: MeasureOptions): void {
    this._measureType = type;
    this._customMeasureOptions = this.cloneMeasureOptions(options);
    this.destroyCurrentMeasure();
  }

  start(): void {
    if (!this._measureType) {
      return;
    }

    if (!this._measure) {
      this._measure = this.createMeasureTool(this._measureType);
    }

    this._measure.start();
  }

  end(): void {
    this._measure?.end();
  }

  removeMeasure(): void {
    this.destroyCurrentMeasure();
    this._measureType = null;
    this._customMeasureOptions = {};
  }

  updateLanguage(): void {
    if (!this._measureType) {
      return;
    }

    const cachedType = this._measureType;
    const cachedOptions = this.cloneMeasureOptions(this._customMeasureOptions);
    const shouldRestart = this._measure !== null;

    // 先缓存再重建，避免语言切换时丢失用户自定义配置。
    this.destroyCurrentMeasure();
    this._measureType = cachedType;
    this._customMeasureOptions = cachedOptions;

    if (shouldRestart) {
      this.start();
    }
  }

  override destroy(): void {
    super.destroy();

    this.removeMeasure();

    if (this._langChangeHandler) {
      this.earth.off("lang:change", this._langChangeHandler);
      this._langChangeHandler = null;
    }
  }

  private createMeasureTool(type: MeasureType): MeasureTool {
    const resolvedOptions = this.resolveMeasureOptions();

    if (type === "distance" || type === "distanceSurface") {
      return new DistanceMeasureTool(this.viewer, type, resolvedOptions);
    }

    return new AreaMeasureTool(this.viewer, type, resolvedOptions);
  }

  private resolveMeasureOptions(): ResolvedMeasureOptions {
    const localeDefaults =
      DEFAULT_MEASURE_OPTIONS[this.earth.i18n.locale] ??
      DEFAULT_MEASURE_OPTIONS["en-US"];

    const mergedLocale = {
      ...localeDefaults.locale,
      ...(this._customMeasureOptions.locale ?? {}),
    };

    const mergedTips = {
      ...(localeDefaults.drawerOptions?.tips ?? {}),
      ...(this._customMeasureOptions.drawerOptions?.tips ?? {}),
    };

    return {
      labelStyle: {
        ...DEFAULT_LABEL_STYLE,
        ...(localeDefaults.labelStyle ?? {}),
        ...(this._customMeasureOptions.labelStyle ?? {}),
      },
      units:
        this._customMeasureOptions.units ??
        localeDefaults.units ??
        "kilometers",
      onEnd: this._customMeasureOptions.onEnd ?? localeDefaults.onEnd,
      locale: {
        ...mergedLocale,
      },
      drawerOptions: {
        tips: {
          init: mergedTips.init ?? "Click to start measuring",
          start:
            mergedTips.start ??
            "Left click add point, right click remove point, double click finish",
        },
      },
      renderingOptions: {
        ...(localeDefaults.renderingOptions ?? {}),
        ...(this._customMeasureOptions.renderingOptions ?? {}),
      },
    };
  }

  private destroyCurrentMeasure(): void {
    this._measure?.destroy();
    this._measure = null;
  }

  private cloneMeasureOptions(options: MeasureOptions): MeasureOptions {
    return {
      ...options,
      labelStyle: options.labelStyle ? { ...options.labelStyle } : undefined,
      locale: options.locale ? { ...options.locale } : undefined,
      drawerOptions: options.drawerOptions
        ? {
            ...options.drawerOptions,
            tips: options.drawerOptions.tips
              ? { ...options.drawerOptions.tips }
              : undefined,
          }
        : undefined,
      renderingOptions: options.renderingOptions
        ? { ...options.renderingOptions }
        : undefined,
    };
  }
}
