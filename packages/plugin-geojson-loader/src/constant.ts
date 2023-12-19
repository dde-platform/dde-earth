import type { GeoJsonRenderConfig } from "@cesium-extends/geojson-render";

export type GeoJsonType = "polygon" | "line" | "point" | "mix";

export const DefaultGeoJsonRenderOptions: Record<
  GeoJsonRenderConfig["type"],
  GeoJsonRenderConfig["style"]
> = {
  polygon: {
    type: "single",
    config: {
      color: { r: 252, g: 76, b: 2, a: 1 },
      "outline-color": { r: 255, g: 255, b: 255, a: 0.8 },
      "outline-width": 2,
      opacity: 1,
    },
  },
  line: {
    type: "single",
    config: {
      color: { r: 252, g: 76, b: 2, a: 1 },
      "line-width": 2,
      opacity: 1,
    },
  },
  point: {
    type: "single",
    config: {
      "circle-stroke-color": { r: 255, g: 255, b: 255, a: 1 },
      "circle-stroke-width": 1,
      opacity: 1,
      "label-type": "vector",
      color: { r: 252, g: 76, b: 2, a: 1 },
      "label-size": 10,
    },
  },
  mix: {
    type: "single",
    config: {
      "label-type": "vector",
      fill: { r: 252, g: 76, b: 2, a: 1 },
      markerColor: { r: 252, g: 76, b: 2, a: 1 },
      stroke: { r: 255, g: 255, b: 255, a: 1 },
      strokeWidth: 1,
      markerSize: 5,
    },
  },
};
