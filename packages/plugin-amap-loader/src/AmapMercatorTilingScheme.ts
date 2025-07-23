import {
  Math as CMath,
  Cartesian2,
  Cartographic,
  WebMercatorProjection,
  WebMercatorTilingScheme,
} from "cesium";

import CoordTransform from "./CoordTransform";

import type { Cartesian3, Ellipsoid } from "cesium";

class AmapMercatorTilingScheme extends WebMercatorTilingScheme {
  constructor(options?: {
    ellipsoid?: Ellipsoid;
    numberOfLevelZeroTilesX?: number;
    numberOfLevelZeroTilesY?: number;
    rectangleSouthwestInMeters?: Cartesian2;
    rectangleNortheastInMeters?: Cartesian2;
  }) {
    super(options);
    const projection: WebMercatorProjection = new WebMercatorProjection();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this._projection.project = function (cartographic: Cartographic) {
      const lonlat = CoordTransform.WGS84ToGCJ02(
        +CMath.toDegrees(cartographic.longitude),
        +CMath.toDegrees(cartographic.latitude),
      );
      const newResult = projection.project(
        new Cartographic(
          CMath.toRadians(lonlat[0]),
          CMath.toRadians(lonlat[1]),
        ),
      );
      return new Cartesian2(newResult.x, newResult.y);
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this._projection.unproject = function (cartesian: Cartesian3) {
      const cartographic = projection.unproject(cartesian);
      const nweResult = CoordTransform.GCJ02ToWGS84(
        +CMath.toDegrees(cartographic.longitude),
        +CMath.toDegrees(cartographic.latitude),
      );
      return new Cartographic(
        CMath.toRadians(nweResult[0]),
        CMath.toRadians(nweResult[1]),
      );
    };
  }
}

export default AmapMercatorTilingScheme;
