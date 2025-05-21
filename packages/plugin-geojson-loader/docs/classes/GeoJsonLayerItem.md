[**GeoJSON Loader Plugin API**](../README.md)

***

[GeoJSON Loader Plugin API](../README.md) / GeoJsonLayerItem

# Class: GeoJsonLayerItem

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:22](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L22)

## Extends

- `LayerItem`\<[`Data`](../GeoJSON-Loader-Plugin-API/namespaces/GeoJsonLayerItem/type-aliases/Data.md), `DataSource`\>

## Constructors

### Constructor

> **new GeoJsonLayerItem**(`earth`, `data`, `options?`): `GeoJsonLayerItem`

Defined in: dde-earth/dist/typings/index.d.ts:123

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../GeoJSON-Loader-Plugin-API/namespaces/GeoJsonLayerItem/type-aliases/Data.md)

##### options?

`Options`\<`BaseLayer`\<`string`, `any`\>\>

#### Returns

`GeoJsonLayerItem`

#### Inherited from

`LayerItem< GeoJsonLayerItem.Data, DataSource >.constructor`

## Properties

### \_instance?

> `protected` `optional` **\_instance**: `DataSource`

Defined in: dde-earth/dist/typings/index.d.ts:111

#### Inherited from

`LayerItem._instance`

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:114

#### Inherited from

`LayerItem._isDestroyed`

***

### \_ready

> `protected` **\_ready**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:113

#### Inherited from

`LayerItem._ready`

***

### \_renderOptions?

> `protected` `optional` **\_renderOptions**: GeoJsonCommonStyle & GeoJsonPointStyle \| GeoJsonCommonStyle & GeoJsonLineStyle \| GeoJsonCommonStyle & GeoJsonPolygonStyle \| `GeoJsonCommonStyle` & `GeoJsonMixStyle`

Defined in: dde-earth/dist/typings/index.d.ts:116

#### Inherited from

`LayerItem._renderOptions`

***

### data

> `readonly` **data**: [`Data`](../GeoJSON-Loader-Plugin-API/namespaces/GeoJsonLayerItem/type-aliases/Data.md)

Defined in: dde-earth/dist/typings/index.d.ts:109

#### Inherited from

`LayerItem.data`

***

### defaultRenderOptions

> **defaultRenderOptions**: `undefined`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:26](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L26)

#### Overrides

`LayerItem.defaultRenderOptions`

***

### earth

> `readonly` **earth**: `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:107

#### Inherited from

`LayerItem.earth`

***

### id

> `readonly` **id**: `any`

Defined in: dde-earth/dist/typings/index.d.ts:112

#### Inherited from

`LayerItem.id`

***

### method

> `readonly` **method**: `"geojson"`

Defined in: dde-earth/dist/typings/index.d.ts:110

#### Inherited from

`LayerItem.method`

***

### options

> `readonly` **options**: `Options`

Defined in: dde-earth/dist/typings/index.d.ts:108

#### Inherited from

`LayerItem.options`

## Accessors

### instance

#### Get Signature

> **get** **instance**(): `undefined` \| `Instance`

Defined in: dde-earth/dist/typings/index.d.ts:122

##### Returns

`undefined` \| `Instance`

#### Inherited from

`LayerItem.instance`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:118

##### Returns

`boolean`

#### Inherited from

`LayerItem.isDestroyed`

***

### ready

#### Get Signature

> **get** **ready**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:119

##### Returns

`boolean`

#### Inherited from

`LayerItem.ready`

***

### renderOptions

#### Get Signature

> **get** **renderOptions**(): `undefined` \| `Lyr`\[`"renderOptions"`\]

Defined in: dde-earth/dist/typings/index.d.ts:117

##### Returns

`undefined` \| `Lyr`\[`"renderOptions"`\]

#### Inherited from

`LayerItem.renderOptions`

***

### show

#### Get Signature

> **get** **show**(): `boolean`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:30](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L30)

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`value`): `void`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:34](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L34)

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Overrides

`LayerItem.show`

***

### summary

#### Get Signature

> **get** **summary**(): `Summary`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:45](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L45)

##### Returns

`Summary`

***

### type

#### Get Signature

> **get** **type**(): `GeoJsonType`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:41](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L41)

##### Returns

`GeoJsonType`

## Methods

### \_init()

> **\_init**(`data`): `Promise`\<`DataSource`\>

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:49](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L49)

#### Parameters

##### data

[`Data`](../GeoJSON-Loader-Plugin-API/namespaces/GeoJsonLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<`DataSource`\>

#### Overrides

`LayerItem._init`

***

### \_remove()

> **\_remove**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:95](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L95)

#### Returns

`boolean` \| `Promise`\<`boolean`\>

#### Overrides

`LayerItem._remove`

***

### \_render()

> **\_render**(`options`): `Promise`\<`undefined` \| `DataSource`\>

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:79](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L79)

#### Parameters

##### options

`undefined` | GeoJsonCommonStyle & GeoJsonPointStyle | GeoJsonCommonStyle & GeoJsonLineStyle | GeoJsonCommonStyle & GeoJsonPolygonStyle | `GeoJsonCommonStyle` & `GeoJsonMixStyle`

#### Returns

`Promise`\<`undefined` \| `DataSource`\>

#### Overrides

`LayerItem._render`

***

### destroy()

> **destroy**(): `void`

Defined in: dde-earth/dist/typings/index.d.ts:131

#### Returns

`void`

#### Inherited from

`LayerItem.destroy`

***

### initial()

> **initial**(): `Promise`\<`GeoJsonLayerItem`\>

Defined in: dde-earth/dist/typings/index.d.ts:124

#### Returns

`Promise`\<`GeoJsonLayerItem`\>

#### Inherited from

`LayerItem.initial`

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: dde-earth/dist/typings/index.d.ts:128

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

`LayerItem.remove`

***

### render()

> **render**(`renderOptions`): `Promise`\<`undefined` \| `DataSource`\>

Defined in: dde-earth/dist/typings/index.d.ts:130

#### Parameters

##### renderOptions

`undefined` | GeoJsonCommonStyle & GeoJsonPointStyle | GeoJsonCommonStyle & GeoJsonLineStyle | GeoJsonCommonStyle & GeoJsonPolygonStyle | `GeoJsonCommonStyle` & `GeoJsonMixStyle`

#### Returns

`Promise`\<`undefined` \| `DataSource`\>

#### Inherited from

`LayerItem.render`

***

### zoomTo()

> **zoomTo**(`options`): `void`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerItem.ts:103](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerItem.ts#L103)

#### Parameters

##### options

`ZoomToOptions` = `{}`

#### Returns

`void`

#### Overrides

`LayerItem.zoomTo`
