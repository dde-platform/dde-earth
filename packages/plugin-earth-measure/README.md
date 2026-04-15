# Earth Measure Plugin

`@dde-earth/plugin-earth-measure` provides interactive distance/area measurement for `dde-earth`.

## Highlights

- Uses `@dde-earth/plugin-drawer` as the drawing engine
- Real-time distance and area labels while drawing
- i18n-ready locale text and number formatting
- Customizable polyline/polygon rendering style
- Compatible API: `setMeasure`, `start`, `end`, `removeMeasure`

## Install

```bash
pnpm add @dde-earth/plugin-earth-measure
```

## Usage

```ts
import { EarthMeasure } from "@dde-earth/plugin-earth-measure";
import { Earth } from "dde-earth";

const earth = new Earth(container);
const measure = earth.usePlugin(new EarthMeasure());

measure.setMeasure("distance", {});
measure.start();

measure.setMeasure("area", {});
measure.start();

measure.end();
measure.removeMeasure();
```

## API

### `setMeasure(type, options)`

- `type`: `"distance" | "distanceSurface" | "area" | "areaSurface"`
- `options`: measurement options

### `start()`

Start interactive measuring.

### `end()`

End current measure session and clear temporary/result entities and labels.

### `removeMeasure()`

Destroy current measure tool and clear internal state.

### `currentMeasureTool`

Current internal measure tool instance (or `null`).

## Options

```ts
import type {
  Cartesian2,
  Color,
  Entity,
  HeightReference,
  LabelStyle,
  NearFarScalar,
  PolygonGraphics,
  PolylineGraphics,
} from "cesium";

type MeasureUnits =
  | "meters"
  | "millimeters"
  | "centimeters"
  | "kilometers"
  | "acres"
  | "miles"
  | "nauticalmiles"
  | "inches"
  | "yards"
  | "feet"
  | "radians"
  | "degrees"
  | "hectares";

type MeasureOptions = {
  labelStyle?: {
    font?: string;
    fillColor?: Color;
    backgroundColor?: Color;
    backgroundPadding?: Cartesian2;
    outlineWidth?: number;
    style?: LabelStyle;
    pixelOffset?: Cartesian2;
    scale?: number;
    scaleByDistance?: NearFarScalar;
    heightReference?: HeightReference;
  };
  units?: MeasureUnits;
  onEnd?: (entity: Entity) => void;
  drawerOptions?: {
    tips?: {
      init?: string;
      start?: string;
    };
  };
  locale?: {
    start?: string;
    total?: string;
    area?: string;
    formatLength?: (
      length: number,
      unitedLength: number,
      unit: MeasureUnits,
    ) => string;
    formatArea?: (
      area: number,
      unitedArea: number,
      unit: MeasureUnits,
    ) => string;
  };
  renderingOptions?: {
    polyline?: PolylineGraphics.ConstructorOptions;
    polygon?: PolygonGraphics.ConstructorOptions;
  };
};
```

## Surface Measure Compatibility

`distanceSurface` and `areaSurface` are kept for API compatibility.

Current version maps them to the same behavior as `distance` and `area`.
A future version can add terrain/surface-specific precision logic.

## Notes

- This plugin keeps one active measure session at a time.
- On `lang:change`, plugin rebuilds the measure tool with cached custom options.
