import {
  renderGeoJson,
  updateDataSourcePosition,
} from "@cesium-extends/geojson-render";
import { GeoJsonDataSource, Resource } from "cesium";
import { LayerItem } from "dde-earth";

import { summaryGeoJSON } from "./func";

import type {
  GeoJsonCommonStyle,
  GeoJsonLineStyle,
  GeoJsonMixStyle,
  GeoJsonPointStyle,
  GeoJsonPolygonStyle,
} from "@cesium-extends/geojson-render";
import type { DataSource } from "cesium";
import type { LayerManager } from "dde-earth";
import type { GeoJsonType } from "./constant";
import type { Summary } from "./func";

export class GeoJsonLayerItem extends LayerItem<
  GeoJsonLayerItem.Data,
  DataSource
> {
  defaultRenderOptions: undefined;
  private _type: GeoJsonType = "mix";
  private _summary: Summary = null;

  get show() {
    return this.instance?.show ?? false;
  }

  set show(value: boolean) {
    if (this.instance) {
      this.instance.show = value;
      this.earth.viewer.scene.requestRender();
    }
  }

  get type() {
    return this._type;
  }

  get summary() {
    return this._summary;
  }

  async _init(data: GeoJsonLayerItem.Data): Promise<DataSource> {
    const { url, queryParameters, headers } = data;
    let geojson = url;
    if (typeof geojson === "string") {
      geojson = await Resource.fetchJson({
        url: geojson,
        queryParameters,
        headers,
      });
    }
    const summary = summaryGeoJSON(geojson);
    this._summary = summary;
    const type = data.type ?? summary?.type ?? "mix";

    this._type = type;
    const dataSource: DataSource = await GeoJsonDataSource.load(geojson);
    updateDataSourcePosition(dataSource);
    const renderOptions =
      data.renderOptions ?? this.options.defaultRenderOptions[this.type];
    this.defaultRenderOptions = renderOptions;
    this._renderOptions = renderOptions;
    if (renderOptions)
      await renderGeoJson(dataSource, {
        type,
        style: renderOptions,
      } as any);
    this.earth.viewer.dataSources.add(dataSource);
    return dataSource;
  }

  async _render(options: GeoJsonLayerItem.RenderOptions) {
    if (this.instance && options) {
      this._renderOptions = {
        ...this._renderOptions,
        ...options,
      } as GeoJsonLayerItem.RenderOptions;

      renderGeoJson(this.instance, {
        type: this.type,
        style: this._renderOptions,
      } as any);
    }
    this.earth.viewer.scene.requestRender();
    return this.instance;
  }

  _remove(): boolean | Promise<boolean> {
    let bool = false;
    if (this.instance) {
      bool = this.earth.viewer.dataSources.remove(this.instance);
    }
    return bool;
  }

  zoomTo(options: LayerItem.ZoomToOptions = {}) {
    if (this.instance) {
      this.earth.viewer.flyTo(this.instance, {
        duration: 1,
        ...options,
      });
    }
  }
}

export namespace GeoJsonLayerItem {
  export type Method = "geojson";

  export type Type = GeoJsonType;

  type GeoJsonRenderConfig =
    | {
        type: "point";
        renderOptions?: GeoJsonCommonStyle & GeoJsonPointStyle;
      }
    | {
        type: "line";
        renderOptions?: GeoJsonCommonStyle & GeoJsonLineStyle;
      }
    | {
        type: "polygon";
        renderOptions?: GeoJsonCommonStyle & GeoJsonPolygonStyle;
      }
    | {
        type: "mix";
        renderOptions?: GeoJsonCommonStyle & GeoJsonMixStyle;
      };

  export type Data = Omit<LayerManager.BaseLayer<Method>, "renderOptions"> & {
    url: any;
    headers?: any;
    queryParameters?: any;
  } & Partial<GeoJsonRenderConfig>;

  export type RenderOptions = Data["renderOptions"];
}
