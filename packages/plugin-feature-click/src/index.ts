import type { Earth, EventEmitter } from "dde-earth";

import "./api";

import { GeoJsonPrimitiveLayer } from "@cesium-extends/primitive-geojson";
import { JulianDate } from "cesium";
import { BasePlugin } from "dde-earth";

import type { Subscriber } from "@dde-earth/recommend-plugins";
import type { DataSource, Entity } from "cesium";

export class FeatureClick extends BasePlugin<
  FeatureClick.Args,
  FeatureClick.Intl
> {
  name = "FeatureClick";
  private _subscriber: Subscriber | undefined;
  private _eventEmitter: EventEmitter | undefined;

  public init(earth: Earth) {
    this._init(earth);
    this._subscriber = this.earth.getSubscriber();
    this._eventEmitter = this.earth.eventEmitter;
    this.addListner();
    return this;
  }

  addListner() {
    if (!this._subscriber || !this._eventEmitter) return;

    const sub = this._subscriber;
    sub.on("LEFT_CLICK", (move, result) => {
      if (result?.id) {
        const entity = result.id as Entity;
        const properties = entity.properties?.propertyNames?.length
          ? entity.properties?.getValue(new JulianDate())
          : undefined;
        const position = sub.cartesiantoLonlat(
          entity.position?.getValue(new JulianDate()),
        );

        this.earth.emit("FEATURE_CLICK", {
          feature: entity,
          properties,
          position,
        });
      }
    });

    this.earth.on("layer:add", (layerItem) => {
      const layer = layerItem.instance;
      if (layer instanceof GeoJsonPrimitiveLayer) {
        sub.on("LEFT_CLICK", (move, result) => {
          if (result?.primitive) {
            const id = result.id;
            const feature = layer.getFeatureItemById(id);
            if (feature)
              this.earth.emit("FEATURE_CLICK", {
                feature: feature,
                properties: feature.properties,
                position: sub.cartesiantoLonlat(feature.center?.cartesian3),
              });
          }
        });
      }
    });
  }
}

export namespace FeatureClick {
  export type Intl = {};

  export type Args = [];

  export type SupportedLayer = GeoJsonPrimitiveLayer | DataSource;
}
