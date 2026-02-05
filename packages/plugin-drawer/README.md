# @dde-earth/plugin-drawer

[中文文档](./README.zh-CN.md)

Cesium drawing plugin that supports drawing points, lines, polygons, rectangles, and circles.

## Installation

```bash
pnpm add @dde-earth/plugin-drawer
```

## Usage

```typescript
import { Drawer } from "@dde-earth/plugin-drawer";
import { Earth } from "dde-earth";

const earth = new Earth(container);
const drawer = earth.usePlugin(new Drawer());

// Start drawing a polygon interactively
drawer.startDraw("polygon", {
  onComplete: (result) => {
    console.log("Drawing completed", result.entity, result.positions);
  },
});

// Stop drawing
drawer.stopDraw();

// Clear all drawings
drawer.clear();
```

## Supported Drawing Types

| Type        | Description                 |
| ----------- | --------------------------- |
| `point`     | Single point                |
| `line`      | Polyline (multiple points)  |
| `polygon`   | Polygon                     |
| `rectangle` | Rectangle (2 corner points) |
| `circle`    | Circle (center + radius)    |

## Interaction Methods

- **Left Click**: Add point / Confirm
- **Right Click**: Undo last point
- **Double Click**: Complete drawing

## API

### Interactive Drawing

#### `startDraw(type, options?)`

Start interactive drawing of a specified shape.

```typescript
drawer.startDraw("polygon", {
  onComplete: (result) => {
    console.log(result.entity, result.positions);
  },
  onCancel: () => {
    console.log("Drawing cancelled");
  },
  style: {
    point: { pixelSize: 10, color: Cesium.Color.RED },
    polyline: { width: 2, material: Cesium.Color.YELLOW },
    polygon: { material: Cesium.Color.BLUE.withAlpha(0.5) },
  },
});
```

**Parameters:**

- `type`: `"point" | "line" | "polygon" | "rectangle" | "circle"`
- `options`: Drawing options
  - `onComplete`: Callback when drawing is complete
  - `onCancel`: Callback when drawing is cancelled
  - `onPointAdd`: Callback when a point is added
  - `onPointRemove`: Callback when a point is removed
  - `style`: Style configuration
  - `showTips`: Whether to show tooltips (default: true)

#### `stopDraw()`

Stop the current interactive drawing.

#### `clear()`

Clear all drawn shapes.

#### `removeEntity(entity)`

Remove a specific entity.

#### `removeLastEntity()`

Remove the last drawn entity.

### Direct Drawing (by Coordinates)

Draw shapes directly by providing coordinates, without user interaction.

#### `drawPoint(position, options?)`

Draw a point at the specified position.

```typescript
import { Cartesian3 } from "cesium";

drawer.drawPoint(Cartesian3.fromDegrees(120, 30));
```

#### `drawLine(positions, options?)`

Draw a line through the specified positions (at least 2 points).

```typescript
drawer.drawLine([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 31),
  Cartesian3.fromDegrees(122, 30.5),
]);
```

#### `drawPolygon(positions, options?)`

Draw a polygon with the specified vertices (at least 3 points).

```typescript
drawer.drawPolygon([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 30),
  Cartesian3.fromDegrees(121, 31),
  Cartesian3.fromDegrees(120, 31),
]);
```

#### `drawRectangle(positions, options?)`

Draw a rectangle with 2 diagonal corner points.

```typescript
drawer.drawRectangle([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 31),
]);
```

#### `drawCircle(center, radius, options?)`

Draw a circle with center and radius.

```typescript
// Using radius in meters
drawer.drawCircle(Cartesian3.fromDegrees(120, 30), 10000);

// Or using an edge point to determine radius
drawer.drawCircle(
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(120.1, 30),
);
```

### Properties

| Property        | Type                 | Description               |
| --------------- | -------------------- | ------------------------- |
| `isDrawing`     | `boolean`            | Whether currently drawing |
| `currentType`   | `DrawerType \| null` | Current drawing type      |
| `drawnEntities` | `Entity[]`           | List of drawn entities    |

### `destroy()`

Destroy the plugin and clean up all resources.

## DrawResult

The result object returned by drawing operations:

```typescript
interface DrawResult {
  entity: Entity; // The created Cesium Entity
  positions: Cartesian3[]; // Array of coordinates
  type: DrawerType; // Drawing type
  radius?: number; // Circle radius (only for circle type)
}
```

## License

MIT
