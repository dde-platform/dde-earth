import { renderPrimitiveGeoJson } from "@cesium-extends/geojson-render";
import GeoJsonPrimitiveLayer from "@cesium-extends/primitive-geojson";
import { Math as CMath, Resource } from "cesium";
import { LayerItem } from "dde-earth";

import { getGeoJsonViewPort, summaryGeoJSON } from "./func";

import type { GeoJsonStyle } from "@cesium-extends/geojson-render";
import type { Rectangle } from "cesium";
import type { LayerManager } from "dde-earth";
import type { GeoJsonType } from "./constant";

export class PrimitiveGeojsonLayerItem extends LayerItem<
  PrimitiveGeojsonLayerItem.Data,
  GeoJsonPrimitiveLayer
> {
  defaultRenderOptions: undefined;
  private _type: GeoJsonType = "mix";
  private _viewPort!: Rectangle;

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

  async _init(
    data: PrimitiveGeojsonLayerItem.Data,
  ): Promise<GeoJsonPrimitiveLayer> {
    const { url, queryParameters, headers } = data;
    let geojson = url;
    if (typeof geojson === "string") {
      geojson = await Resource.fetchJson({
        url: geojson,
        queryParameters,
        headers,
      });
    }
    const type = summaryGeoJSON(geojson)?.type ?? "mix";
    this._viewPort = getGeoJsonViewPort(geojson);
    this._type = type;
    const primitiveObj = new GeoJsonPrimitiveLayer();
    const primitiveLayer = await primitiveObj.load(geojson);
    const renderOptions =
      data.renderOptions ?? this.options.defaultRenderOptions[this.type];
    this.defaultRenderOptions = renderOptions;
    this._renderOptions = renderOptions;

    if (renderOptions)
      await renderPrimitiveGeoJson(primitiveLayer, {
        type,
        style: renderOptions,
      } as any);
    this.earth.viewer.scene.primitives.add(primitiveLayer.primitiveCollection);
    return primitiveLayer;
  }

  async _render(
    options: PrimitiveGeojsonLayerItem.Data["renderOptions"],
    instance = this.instance,
  ) {
    if (instance && options) {
      this._renderOptions = {
        ...this._renderOptions,
        ...options,
      } as PrimitiveGeojsonLayerItem.RenderOptions;
      renderPrimitiveGeoJson(instance, {
        type: this.type,
        style: this._renderOptions,
      } as any);
    }
    this.earth.viewer.scene.requestRender();
    return instance;
  }

  _remove(): boolean | Promise<boolean> {
    if (this.instance) {
      this.instance?.destroy();
      this.earth.viewer.scene.requestRender();
      return this.instance?.isDestroyed;
    }
    return true;
  }

  zoomTo(options: LayerItem.ZoomToOptions = {}) {
    if (this.instance) {
      this.earth.viewer.camera.flyTo({
        destination: this._viewPort,
        orientation: {
          heading: CMath.toRadians(0),
          pitch: CMath.toRadians(-90),
          roll: CMath.toRadians(0),
        },
        duration: 1,
        ...options,
      });
    }
  }
}

export namespace PrimitiveGeojsonLayerItem {
  export type Method = "primitiveGeojson";
  export type Type = GeoJsonType;

  export type Data = LayerManager.BaseLayer<Method, RenderOptions> & {
    url: any;
    headers?: any;
    queryParameters?: any;
  };

  export type RenderOptions = GeoJsonStyle;
}
