/* eslint-disable @typescript-eslint/no-namespace */
import { BasePlugin } from "dde-earth";

import { TimelineRenderer } from "./TimelineRenderer";

import type { Earth } from "dde-earth";
import type { GeoTimeData, LayerItem } from "./types";

export class GeoTimescalePlugin extends BasePlugin {
  name = "GeoTimescalePlugin";
  private renderer: TimelineRenderer | null = null;
  private container: HTMLElement | null = null;
  private _visible = true;
  private _geoTime: GeoTimeData | undefined;
  private _layerItems: LayerItem[] = [];

  get visible(): boolean {
    return this._visible;
  }

  set visible(value: boolean) {
    this._visible = value;
    if (this.container) {
      this.container.style.height = value ? "160px" : "0px";
      this.container.style.opacity = value ? "1" : "0";
    }
  }

  get geoTime(): GeoTimeData | undefined {
    return this._geoTime;
  }

  get layerItems(): LayerItem[] {
    return this._layerItems;
  }

  hide() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }

  setGeoTime(geoTime: GeoTimeData | undefined) {
    this._geoTime = geoTime;
    if (this.renderer) {
      this.renderer.updateGeoTime(geoTime);
    }
  }

  setLayerItems(layerItems: LayerItem[]) {
    this._layerItems = layerItems;
    if (this.renderer) {
      this.renderer.updateLayerItems(layerItems);
    }
  }

  init(earth: Earth, options?: GeoTimescalePlugin.Options) {
    this._init(earth);

    // 创建容器
    const containerElement = options?.container || document.body;
    this.container = document.createElement("div");
    this.container.id = "geo-timescale-plugin-container";
    this.container.style.cssText = `
      width: 100%;
      height: 160px;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      opacity: 1;
    `;

    // 如果提供了容器，添加到容器中；否则添加到 body
    if (containerElement instanceof HTMLElement) {
      containerElement.appendChild(this.container);
    }

    // 创建渲染器
    this.renderer = new TimelineRenderer(this.container, {
      onChange: (geoTime: GeoTimeData) => {
        this._geoTime = geoTime;
        if (options?.onChange) {
          options.onChange(geoTime);
        }
      },
      height: options?.height || 140,
      tickLength: options?.tickLength || 10,
      neighborWidth: options?.neighborWidth || 80,
    });

    // 初始化时间
    if (!this._geoTime) {
      this.setGeoTime({ start: 0, end: 0, name: "Phanerozoic" });
    }

    return this;
  }

  destroy(): void {
    if (this.renderer) {
      this.renderer.destroy();
      this.renderer = null;
    }
    if (this.container && this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
      this.container = null;
    }
  }
}

export namespace GeoTimescalePlugin {
  export interface Options extends BasePlugin.Options {
    container?: HTMLElement;
    onChange?: (geoTime: GeoTimeData) => void;
    height?: number;
    tickLength?: number;
    neighborWidth?: number;
  }
}
