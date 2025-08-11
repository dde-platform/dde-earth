# Earth Measure Plugin

This plugin provides measurement functionality for dde-earth applications, including distance and area measurements on the globe.

## Features

- Distance measurement (straight line and surface distance)
- Area measurement (2D area and surface area)
- Multiple unit support (meters, kilometers, miles, acres, etc.)
- Internationalization support (Chinese and English)
- Customizable measurement appearance and labels
- Interactive drawing with mouse controls
- Real-time measurement display
- Integration with @cesium-extends/measure library

## Installation

```bash
npm install @dde-earth/plugin-earth-measure
```

## Usage

### Basic Usage

```typescript
import { EarthMeasure } from "@dde-earth/plugin-earth-measure";
import { Earth } from "dde-earth";

// Create earth instance
const earth = new Earth(container);

// Initialize the plugin
const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);

// Start distance measurement
measurePlugin.setMeasure("distance", {});
measurePlugin.start();

// Start area measurement
measurePlugin.setMeasure("area", {});
measurePlugin.start();

// End measurement
measurePlugin.end();

// Remove measurement
measurePlugin.removeMeasure();
```

### With Custom Options

```typescript
import { EarthMeasure } from "@dde-earth/plugin-earth-measure";

const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);

// Configure distance measurement with custom options
measurePlugin.setMeasure("distance", {
  units: "miles",
  labelStyle: {
    font: "14px Arial",
    fillColor: Color.YELLOW,
    backgroundColor: Color.BLACK,
    scale: 1.2,
  },
  drawerOptions: {
    tips: {
      init: "Click to start measuring",
      start: "Click to add points, double-click to finish",
    },
  },
});
measurePlugin.start();
```

### Advanced Configuration

```typescript
// Initialize with detailed measurement options
measurePlugin.setMeasure("areaSurface", {
  units: "acres",
  labelStyle: {
    font: "16px sans-serif",
    fillColor: Color.WHITE,
    backgroundColor: Color.BLUE,
    backgroundPadding: new Cartesian2(8, 4),
    outlineWidth: 2,
    scale: 1.0,
  },
  locale: {
    start: "起点",
    area: "面积",
    total: "总计",
    formatLength: (length, unitedLength) => {
      if (length < 1000) {
        return length + "米";
      }
      return unitedLength + "千米";
    },
    formatArea: (area, unitedArea) => {
      if (area < 1000000) {
        return area + "平方米";
      }
      return unitedArea + "平方千米";
    },
  },
});
```

## API

### Methods

#### `init(earth: Earth)`

Initialize the plugin with an Earth instance.

#### `setMeasure(type: MeasureType, options: MeasureOptions)`

Set the measurement type and configuration options.

**Parameters:**

- `type`: Measurement type - "distance", "distanceSurface", "area", or "areaSurface"
- `options`: Configuration options for the measurement

#### `start(): void`

Start the measurement process.

#### `end(): void`

End the current measurement process.

#### `removeMeasure(): void`

Remove and destroy the current measurement tool.

#### `updateLanguage(): void`

Update the measurement language based on current earth locale.

#### `destroy(): void`

Clean up and destroy the plugin instance.

### Properties

#### `currentMeasureTool`

Get the current measurement tool instance.

### Options

```typescript
interface MeasureOptions {
  /** Label styling options */
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

  /** Measurement units (default: "kilometers") */
  units?: MeasureUnits;

  /** Callback when measurement ends */
  onEnd?: (entity: Entity) => void;

  /** Drawing options */
  drawerOptions?: {
    dynamicGraphicsOptions?: {
      POINT: PointGraphics.ConstructorOptions;
      POLYLINE: PolylineGraphics.ConstructorOptions;
      POLYGON: PolygonGraphics.ConstructorOptions;
      CIRCLE: EllipseGraphics.ConstructorOptions;
      RECTANGLE: RectangleGraphics.ConstructorOptions;
    };
    tips?: {
      init: string;
      start: string;
    };
  };

  /** Localization options */
  locale?: Partial<MeasureLocaleOptions>;
}
```

### Supported Units

The plugin supports the following measurement units:

- **Length**: meters, millimeters, centimeters, kilometers, miles, nauticalmiles, inches, yards, feet, radians, degrees
- **Area**: acres, hectares

## Integration with React Components

You can easily integrate this plugin with React components:

```typescript
import React, { useEffect, useRef, useState } from "react";
import { EarthMeasure } from "@dde-earth/plugin-earth-measure";

const MeasureControl: React.FC = () => {
  const measurePluginRef = useRef<EarthMeasure>();
  const [measureType, setMeasureType] = useState<string>("distance");
  const [isMeasuring, setIsMeasuring] = useState(false);

  useEffect(() => {
    // Initialize plugin when earth is ready
    if (earth && !measurePluginRef.current) {
      measurePluginRef.current = new EarthMeasure();
      measurePluginRef.current.init(earth);
    }

    return () => {
      measurePluginRef.current?.destroy();
    };
  }, [earth]);

  const handleStartMeasure = (type: string) => {
    if (measurePluginRef.current) {
      measurePluginRef.current.setMeasure(type as any, {});
      measurePluginRef.current.start();
      setMeasureType(type);
      setIsMeasuring(true);
    }
  };

  const handleEndMeasure = () => {
    if (measurePluginRef.current) {
      measurePluginRef.current.end();
      setIsMeasuring(false);
    }
  };

  const handleRemoveMeasure = () => {
    if (measurePluginRef.current) {
      measurePluginRef.current.removeMeasure();
      setIsMeasuring(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleStartMeasure("distance")}
        disabled={isMeasuring}
      >
        Measure Distance
      </button>
      <button
        onClick={() => handleStartMeasure("area")}
        disabled={isMeasuring}
      >
        Measure Area
      </button>
      {isMeasuring && (
        <>
          <button onClick={handleEndMeasure}>End Measure</button>
          <button onClick={handleRemoveMeasure}>Remove Measure</button>
        </>
      )}
    </div>
  );
};
```

## Examples

### Basic Distance Measurement

```typescript
// Simple distance measurement
const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);
measurePlugin.setMeasure("distance", {});
measurePlugin.start();
```

### Surface Distance Measurement

```typescript
// Measure distance along the surface
const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);
measurePlugin.setMeasure("distanceSurface", {
  units: "miles",
  labelStyle: {
    fillColor: Color.CYAN,
    scale: 1.5,
  },
});
measurePlugin.start();
```

### Area Measurement with Custom Styling

```typescript
// Area measurement with custom appearance
const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);
measurePlugin.setMeasure("area", {
  units: "acres",
  labelStyle: {
    font: "16px Arial",
    fillColor: Color.YELLOW,
    backgroundColor: Color.BLACK,
    backgroundPadding: new Cartesian2(6, 3),
    scale: 1.2,
  },
});
measurePlugin.start();
```

### Custom Localization

```typescript
// Custom Chinese localization
const measurePlugin = new EarthMeasure();
measurePlugin.init(earth);
measurePlugin.setMeasure("areaSurface", {
  units: "hectares",
  locale: {
    start: "起点",
    area: "面积",
    total: "总计",
    formatLength: (length, unitedLength) => {
      if (length < 1000) {
        return length + "米";
      }
      return unitedLength + "千米";
    },
    formatArea: (area, unitedArea) => {
      if (area < 10000) {
        return area + "平方米";
      }
      return unitedArea + "公顷";
    },
  },
});
```

## Dependencies

This plugin depends on:

- `@cesium-extends/measure`: Provides the core measurement functionality
- `dde-earth`: The main earth visualization library
- `cesium`: The underlying 3D globe library
