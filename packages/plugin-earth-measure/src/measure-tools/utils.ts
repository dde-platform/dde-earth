import turfArea from "@turf/area";
import { convertArea, convertLength, polygon } from "@turf/helpers";
import { Cartesian3 } from "cesium";

import type { Viewer } from "cesium";
import type { MeasureUnits } from "../types";

const LENGTH_UNITS = new Set<MeasureUnits>([
  "meters",
  "millimeters",
  "centimeters",
  "kilometers",
  "miles",
  "nauticalmiles",
  "inches",
  "yards",
  "feet",
  "radians",
  "degrees",
]);

const AREA_UNITS = new Set<MeasureUnits>([
  "acres",
  "hectares",
  "meters",
  "millimeters",
  "centimeters",
  "kilometers",
  "miles",
  "inches",
  "yards",
  "feet",
]);

function round2(value: number): number {
  return Number(value.toFixed(2));
}

function resolveLengthUnit(unit: MeasureUnits): MeasureUnits {
  if (LENGTH_UNITS.has(unit)) {
    return unit;
  }
  return "kilometers";
}

function resolveAreaUnit(unit: MeasureUnits): MeasureUnits {
  if (AREA_UNITS.has(unit)) {
    return unit;
  }
  return "kilometers";
}

export function convertLengthValue(
  lengthInMeters: number,
  unit: MeasureUnits,
): number {
  const targetUnit = resolveLengthUnit(unit);

  try {
    return round2(
      convertLength(
        lengthInMeters,
        "meters",
        targetUnit as Parameters<typeof convertLength>[2],
      ),
    );
  } catch {
    return round2(convertLength(lengthInMeters, "meters", "kilometers"));
  }
}

export function convertAreaValue(
  areaInSquareMeters: number,
  unit: MeasureUnits,
): number {
  const targetUnit = resolveAreaUnit(unit);

  try {
    return round2(
      convertArea(
        areaInSquareMeters,
        "meters",
        targetUnit as Parameters<typeof convertArea>[2],
      ),
    );
  } catch {
    return round2(convertArea(areaInSquareMeters, "meters", "kilometers"));
  }
}

export function calculateSegmentDistance(
  start: Cartesian3,
  end: Cartesian3,
): number {
  return round2(Cartesian3.distance(start, end));
}

export function calculatePolygonArea(
  viewer: Viewer,
  positions: Cartesian3[],
): number {
  if (positions.length < 3) {
    return 0;
  }

  const coordinates: [number, number][] = [];
  positions.forEach((position) => {
    const cartographic =
      viewer.scene.globe.ellipsoid.cartesianToCartographic(position);
    if (!cartographic) {
      return;
    }

    const longitude = (cartographic.longitude * 180) / Math.PI;
    const latitude = (cartographic.latitude * 180) / Math.PI;
    coordinates.push([longitude, latitude]);
  });

  if (coordinates.length < 3) {
    return 0;
  }

  const closedRing = [...coordinates, coordinates[0]];
  return round2(turfArea(polygon([closedRing])));
}

export function calculateCentroid(positions: Cartesian3[]): Cartesian3 | null {
  if (positions.length === 0) {
    return null;
  }

  const sum = positions.reduce(
    (accumulator, position) => {
      accumulator.x += position.x;
      accumulator.y += position.y;
      accumulator.z += position.z;
      return accumulator;
    },
    { x: 0, y: 0, z: 0 },
  );

  return new Cartesian3(
    sum.x / positions.length,
    sum.y / positions.length,
    sum.z / positions.length,
  );
}
