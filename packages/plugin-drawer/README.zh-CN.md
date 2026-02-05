# @dde-earth/plugin-drawer

[English](./README.md)

Cesium 绘图插件，支持点、线、多边形、矩形、圆形的绘制。

## 安装

```bash
pnpm add @dde-earth/plugin-drawer
```

## 使用

```typescript
import { Drawer } from "@dde-earth/plugin-drawer";
import { Earth } from "dde-earth";

const earth = new Earth(container);
const drawer = earth.usePlugin(new Drawer());

// 开始交互式绘制多边形
drawer.startDraw("polygon", {
  onComplete: (result) => {
    console.log("绘制完成", result.entity, result.positions);
  },
});

// 停止绘制
drawer.stopDraw();

// 清除所有绘制
drawer.clear();
```

## 支持的绘图类型

| 类型        | 说明                |
| ----------- | ------------------- |
| `point`     | 单点                |
| `line`      | 折线（多点连线）    |
| `polygon`   | 多边形              |
| `rectangle` | 矩形（2个对角点）   |
| `circle`    | 圆形（圆心 + 半径） |

## 交互方式

- **左键点击**：添加点 / 确认
- **右键点击**：撤销上一个点
- **双击**：完成绘制

## API

### 交互式绘制

#### `startDraw(type, options?)`

开始交互式绘制指定类型的图形。

```typescript
drawer.startDraw("polygon", {
  onComplete: (result) => {
    console.log(result.entity, result.positions);
  },
  onCancel: () => {
    console.log("绘制已取消");
  },
  style: {
    point: { pixelSize: 10, color: Cesium.Color.RED },
    polyline: { width: 2, material: Cesium.Color.YELLOW },
    polygon: { material: Cesium.Color.BLUE.withAlpha(0.5) },
  },
});
```

**参数：**

- `type`: `"point" | "line" | "polygon" | "rectangle" | "circle"`
- `options`: 绘制选项
  - `onComplete`: 绘制完成回调
  - `onCancel`: 绘制取消回调
  - `onPointAdd`: 添加点时的回调
  - `onPointRemove`: 移除点时的回调
  - `style`: 样式配置
  - `showTips`: 是否显示提示（默认: true）

#### `stopDraw()`

停止当前交互式绘制。

#### `clear()`

清除所有已绘制的图形。

#### `removeEntity(entity)`

移除指定的实体。

#### `removeLastEntity()`

移除最后一个绘制的实体。

### 直接绘制（通过坐标）

直接通过坐标绘制图形，无需用户交互。

#### `drawPoint(position, options?)`

在指定位置绘制一个点。

```typescript
import { Cartesian3 } from "cesium";

drawer.drawPoint(Cartesian3.fromDegrees(120, 30));
```

#### `drawLine(positions, options?)`

通过指定坐标绘制线（至少2个点）。

```typescript
drawer.drawLine([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 31),
  Cartesian3.fromDegrees(122, 30.5),
]);
```

#### `drawPolygon(positions, options?)`

通过指定顶点绘制多边形（至少3个点）。

```typescript
drawer.drawPolygon([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 30),
  Cartesian3.fromDegrees(121, 31),
  Cartesian3.fromDegrees(120, 31),
]);
```

#### `drawRectangle(positions, options?)`

通过2个对角点绘制矩形。

```typescript
drawer.drawRectangle([
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(121, 31),
]);
```

#### `drawCircle(center, radius, options?)`

通过圆心和半径绘制圆形。

```typescript
// 使用半径（米）
drawer.drawCircle(Cartesian3.fromDegrees(120, 30), 10000);

// 或者使用边缘点来确定半径
drawer.drawCircle(
  Cartesian3.fromDegrees(120, 30),
  Cartesian3.fromDegrees(120.1, 30),
);
```

### 属性

| 属性            | 类型                 | 说明             |
| --------------- | -------------------- | ---------------- |
| `isDrawing`     | `boolean`            | 是否正在绘制     |
| `currentType`   | `DrawerType \| null` | 当前绘制类型     |
| `drawnEntities` | `Entity[]`           | 已绘制的实体列表 |

### `destroy()`

销毁插件并清理所有资源。

## DrawResult

绘制操作返回的结果对象：

```typescript
interface DrawResult {
  entity: Entity; // 创建的 Cesium Entity
  positions: Cartesian3[]; // 坐标数组
  type: DrawerType; // 绘制类型
  radius?: number; // 圆形半径（仅圆形类型有值）
}
```

## 许可证

MIT
