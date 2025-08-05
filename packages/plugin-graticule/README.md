# Graticule Plugin

This plugin provides graticule (latitude/longitude grid) functionality for dde-earth applications.

## Features

- Display latitude and longitude grid lines on the globe
- Customizable graticule appearance and spacing
- Show/hide graticule functionality
- Integration with cesium-graticule library
- Easy configuration options

## Installation

```bash
npm install @dde-earth/plugin-graticule
```

## Usage

### Basic Usage

```typescript
import { Graticule } from "@dde-earth/plugin-graticule";
import { Earth } from "dde-earth";

// Create earth instance
const earth = new Earth(container);

// Initialize the plugin
const graticulePlugin = new Graticule();
graticulePlugin.init(earth);

// Show graticule
graticulePlugin.show();

// Hide graticule
graticulePlugin.hide();
```

### With Custom Options

```typescript
import { Graticule } from "@dde-earth/plugin-graticule";

const graticulePlugin = new Graticule();
graticulePlugin.init(earth, {
  graticule: {
    // Custom graticule configuration
    interval: 10, // Grid interval in degrees
    color: "#ffffff", // Grid line color
    width: 1, // Grid line width
    alpha: 0.5, // Grid line transparency
  },
});
```

### Advanced Configuration

```typescript
// Initialize with detailed graticule options
graticulePlugin.init(earth, {
  graticule: {
    interval: 15, // 15-degree intervals
    color: "#00ff00", // Green grid lines
    width: 2, // Thicker lines
    alpha: 0.8, // More opaque
    showLabels: true, // Show coordinate labels
    labelColor: "#ffffff", // Label color
    labelSize: 12, // Label font size
  },
});
```

## API

### Methods

#### `init(earth: Earth, options?: Graticule.Options)`

Initialize the plugin with an Earth instance and optional configuration.

#### `show(): void`

Display the graticule grid on the globe.

#### `hide(): void`

Hide the graticule grid from the globe.

#### `destroy(): void`

Clean up and destroy the plugin instance.

### Options

```typescript
interface Graticule.Options {
  /** Graticule configuration options */
  graticule?: GraticulesOptions;
}
```

The `graticule` option accepts all configuration options from the `cesium-graticule` library:

```typescript
interface GraticulesOptions {
  /** Grid interval in degrees (default: 10) */
  interval?: number;
  /** Grid line color (default: "#ffffff") */
  color?: string;
  /** Grid line width (default: 1) */
  width?: number;
  /** Grid line transparency (default: 0.5) */
  alpha?: number;
  /** Whether to show coordinate labels (default: false) */
  showLabels?: boolean;
  /** Label color (default: "#ffffff") */
  labelColor?: string;
  /** Label font size (default: 12) */
  labelSize?: number;
  /** Label font family (default: "Arial") */
  labelFont?: string;
}
```

## Integration with React Components

You can easily integrate this plugin with React components:

```typescript
import React, { useEffect, useRef, useState } from "react";
import { Graticule } from "@dde-earth/plugin-graticule";

const GraticuleControl: React.FC = () => {
  const graticulePluginRef = useRef<Graticule>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize plugin when earth is ready
    if (earth && !graticulePluginRef.current) {
      graticulePluginRef.current = new Graticule();
      graticulePluginRef.current.init(earth);
    }

    return () => {
      graticulePluginRef.current?.destroy();
    };
  }, [earth]);

  const handleToggleGraticule = () => {
    if (graticulePluginRef.current) {
      if (isVisible) {
        graticulePluginRef.current.hide();
        setIsVisible(false);
      } else {
        graticulePluginRef.current.show();
        setIsVisible(true);
      }
    }
  };

  return (
    <button onClick={handleToggleGraticule}>
      {isVisible ? "Hide Graticule" : "Show Graticule"}
    </button>
  );
};
```

## Examples

### Basic Grid Display

```typescript
// Simple 10-degree grid
const graticulePlugin = new Graticule();
graticulePlugin.init(earth);
graticulePlugin.show();
```

### Custom Styled Grid

```typescript
// Custom styled grid with labels
const graticulePlugin = new Graticule();
graticulePlugin.init(earth, {
  graticule: {
    interval: 20, // 20-degree intervals
    color: "#ff0000", // Red grid lines
    width: 2, // Thick lines
    alpha: 0.7, // Semi-transparent
    showLabels: true, // Show labels
    labelColor: "#ffffff", // White labels
    labelSize: 14, // Larger font
  },
});
graticulePlugin.show();
```

### Dynamic Grid Control

```typescript
// Dynamically change grid properties
const graticulePlugin = new Graticule();
graticulePlugin.init(earth, {
  graticule: {
    interval: 5, // Fine grid
    color: "#00ff00", // Green
    alpha: 0.3, // Very transparent
  },
});

// Later, you can reinitialize with different options
graticulePlugin.init(earth, {
  graticule: {
    interval: 30, // Coarse grid
    color: "#0000ff", // Blue
    alpha: 0.8, // More opaque
  },
});
```

## Dependencies

This plugin depends on:

- `cesium-graticule`: Provides the core graticule functionality
- `dde-earth`: The main earth visualization library

## License

MIT
