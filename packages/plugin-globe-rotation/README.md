# Globe Rotation Plugin

This plugin provides globe rotation functionality for dde-earth applications.

## Features

- Start and stop globe rotation
- Configurable rotation speed
- Toggle rotation state
- Auto-start option
- Smooth animation using requestAnimationFrame

## Installation

```bash
npm install @dde-earth/plugin-globe-rotation
```

## Usage

### Basic Usage

```typescript
import { GlobeRotation } from "@dde-earth/plugin-globe-rotation";
import { Earth } from "dde-earth";

// Create earth instance
const earth = new Earth(container);

// Initialize the plugin
const rotationPlugin = new GlobeRotation();
rotationPlugin.init(earth);

// Start rotation
rotationPlugin.startRotation();

// Stop rotation
rotationPlugin.stopRotation();

// Toggle rotation
rotationPlugin.toggleRotation();

// Check rotation state
const isRotating = rotationPlugin.getRotationState();
```

### With Options

```typescript
import { GlobeRotation } from "@dde-earth/plugin-globe-rotation";

const rotationPlugin = new GlobeRotation();
rotationPlugin.init(earth, {
  autoStart: true, // Automatically start rotation when initialized
  rotationSpeed: 0.05, // Custom rotation speed (default: 0.03)
});
```

### Custom Rotation Speed

```typescript
// Start rotation with custom speed
rotationPlugin.startRotation(0.08); // Faster rotation

// Or configure during initialization
rotationPlugin.init(earth, {
  rotationSpeed: 0.01, // Slower rotation
});
```

## API

### Methods

#### `init(earth: Earth, options?: GlobeRotation.Options)`

Initialize the plugin with an Earth instance and optional configuration.

#### `startRotation(rotationSpeed?: number): void`

Start the globe rotation. Optionally specify a custom rotation speed.

#### `stopRotation(): void`

Stop the globe rotation.

#### `toggleRotation(): void`

Toggle between start and stop rotation states.

#### `getRotationState(): boolean`

Get the current rotation state (true if rotating, false if stopped).

#### `show(): void`

Show the plugin (resume rotation if it was previously rotating).

#### `hide(): void`

Hide the plugin (stop rotation).

#### `destroy(): void`

Clean up and destroy the plugin instance.

### Options

```typescript
interface GlobeRotation.Options {
  /** Whether to automatically start rotation when initialized */
  autoStart?: boolean;
  /** Rotation speed (default: 0.03) */
  rotationSpeed?: number;
}
```

## Integration with React Components

You can easily integrate this plugin with React components:

```typescript
import React, { useEffect, useRef } from 'react';
import { GlobeRotation } from '@dde-earth/plugin-globe-rotation';

const RotationControl: React.FC = () => {
  const rotationPluginRef = useRef<GlobeRotation>();
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    // Initialize plugin when earth is ready
    if (earth && !rotationPluginRef.current) {
      rotationPluginRef.current = new GlobeRotation();
      rotationPluginRef.current.init(earth);
    }

    return () => {
      rotationPluginRef.current?.destroy();
    };
  }, [earth]);

  const handleToggleRotation = () => {
    if (rotationPluginRef.current) {
      rotationPluginRef.current.toggleRotation();
      setIsRotating(rotationPluginRef.current.getRotationState());
    }
  };

  return (
    <button onClick={handleToggleRotation}>
      {isRotating ? 'Stop Rotation' : 'Start Rotation'}
    </button>
  );
};
```

## License

MIT
