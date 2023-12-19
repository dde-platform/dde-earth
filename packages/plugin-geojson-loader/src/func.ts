import * as turf from "@turf/turf";
import { Rectangle } from "cesium";

import type { GeoJSON } from "geojson";
import type { GeoJsonType } from "./constant";

export function GeoJSONTypeConvert(geo: GeoJSON.GeoJSON) {
  const { type } = geo ?? {};
  let simpleType: GeoJsonType;
  switch (type) {
    case "LineString":
    case "MultiLineString":
      simpleType = "line";
      break;
    case "MultiPoint":
    case "Point":
      simpleType = "point";
      break;
    case "Polygon":
    case "MultiPolygon":
      simpleType = "polygon";
      break;
    default:
      simpleType = "mix";
  }
  return {
    type,
    simpleType,
  };
}

/**
 * 对象扁平化
 * @param obj 对象
 * @returns 扁平化后的对象
 */
const flatten = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  const isEmpty = (x: Record<string, any>) => Object.keys(x).length === 0;
  const recurse = (cur: Record<string, any>, prop: string) => {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      result[prop] = `[${cur.join()}]`;
    } else {
      if (!isEmpty(cur)) {
        Object.keys(cur).forEach((key) =>
          recurse(cur[key], prop ? `${prop}.${key}` : key),
        );
      } else {
        result[prop] = {};
      }
    }
  };
  recurse(obj, "");
  return result;
};

const getObjColumns = (
  obj: Record<string, any> | Record<string, any>[],
  flat: boolean = true,
) => {
  // 如果时数组,遍历到的第一个不为null的数据的类型为真实类型
  if (Array.isArray(obj)) {
    const newObj = flat ? flatten(obj[0]) : obj[0];
    return Object.entries(newObj ?? {}).map(([key, value]) => {
      if (Array.isArray(value)) return [key, "Array"];
      if (value !== null) return [key, typeof value];
      else {
        let val = null,
          type = "null",
          i = 1;
        while (val === null && i < obj.length) {
          const Obj2 = flat ? flatten(obj[i]) : obj[i];
          val = Obj2[key];
          type = typeof val;
          i += 1;
        }
        return [key, type];
      }
    });
  }
  const newObj = flat ? flatten(obj) : obj;
  return Object.entries(newObj).map(([key, value]) => [key, typeof value]);
};

function handleColumns(columns: string[][]) {
  return columns
    .filter((item) => ["string", "number", "boolean"].includes(item[1]))
    .map((item) => {
      return {
        column_name: item[0],
        data_type: item[1] as any,
      };
    });
}

export type Coloumn = {
  column_name: string;
  data_type: "string" | "number" | "boolean";
}[];

export type Summary = {
  data: Record<string, any>[];
  flatedData: {
    geojson: GeoJSON.Geometry;
  }[];
  type: GeoJsonType;
  count: number;
  columns: Coloumn;
  flatedColumns: Coloumn;
} | null;

export function summaryGeoJSON(geo: GeoJSON.GeoJSON): Summary {
  if (geo.type === "FeatureCollection") {
    let type = GeoJSONTypeConvert(geo.features[0]?.geometry).simpleType;
    const data: Record<string, any>[] = [];
    geo.features.map((item) => {
      data.push({
        ...item.properties,
        geojson: item,
      });
      if (type && GeoJSONTypeConvert(item.geometry).simpleType !== type) {
        type = "mix";
      }
    });
    return {
      data,
      flatedData: geo.features.map((item) => ({
        ...flatten(item.properties ?? {}),
        geojson: item.geometry,
      })),
      type,
      count: data.length,
      columns: handleColumns(
        getObjColumns(
          geo.features.map((feature) => feature.properties) ?? {},
          false,
        ),
      ),
      flatedColumns: handleColumns(
        getObjColumns(geo.features.map((feature) => feature.properties) ?? {}),
      ),
    };
  }

  if (geo.type === "Feature") {
    return {
      data: [
        {
          ...geo.properties,
          geojson: geo.geometry,
        },
      ],
      flatedData: [
        {
          ...flatten(geo.properties ?? {}),
          geojson: geo.geometry,
        },
      ],
      type: GeoJSONTypeConvert(geo.geometry).simpleType,
      count: 1,
      columns: handleColumns(getObjColumns(geo.properties ?? {}, false)),
      flatedColumns: handleColumns(getObjColumns(geo.properties ?? {})),
    };
  }

  if (geo.type) {
    return {
      data: [
        {
          geojson: geo,
        },
      ],
      flatedData: [
        {
          geojson: geo,
        },
      ],
      type: GeoJSONTypeConvert(geo).simpleType,
      count: 1,
      columns: [],
      flatedColumns: [],
    };
  }

  return null;
}

export function getGeoJsonViewPort(geojson: any) {
  const [minLon, minLat, maxLon, maxLat] = turf.bbox(geojson);

  const rectAngle = Rectangle.fromDegrees(minLon, minLat, maxLon, maxLat);
  return rectAngle;
}
