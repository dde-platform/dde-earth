[**GeoJSON Loader Plugin API**](../README.md)

***

[GeoJSON Loader Plugin API](../README.md) / GeoJsonLayerLoader

# Class: GeoJsonLayerLoader

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:9](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L9)

## Extends

- `BasePlugin`

## Constructors

### Constructor

> **new GeoJsonLayerLoader**(`options?`): `GeoJsonLayerLoader`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:10](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L10)

#### Parameters

##### options?

[`Options`](../GeoJSON-Loader-Plugin-API/namespaces/GeoJsonLayerLoader/interfaces/Options.md)

#### Returns

`GeoJsonLayerLoader`

#### Overrides

`BasePlugin.constructor`

## Properties

### \_earth

> `protected` **\_earth**: `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:205

#### Inherited from

`BasePlugin._earth`

***

### \_enable

> `protected` **\_enable**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:206

#### Inherited from

`BasePlugin._enable`

***

### \_getT

> `protected` **\_getT**: `TranslateFunc`\<`any`\>

Defined in: dde-earth/dist/typings/index.d.ts:219

get translation's api

#### Inherited from

`BasePlugin._getT`

***

### \_intl

> `protected` **\_intl**: `ExtendMessages`\<`any`\>

Defined in: dde-earth/dist/typings/index.d.ts:204

Internationalized Dictionary

#### Inherited from

`BasePlugin._intl`

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:207

#### Inherited from

`BasePlugin._isDestroyed`

***

### defaultRenderOptions

> **defaultRenderOptions**: `Record`\<`"polygon"` \| `"line"` \| `"point"` \| `"mix"`, `undefined` \| GeoJsonCommonStyle & GeoJsonPointStyle \| GeoJsonCommonStyle & GeoJsonLineStyle \| GeoJsonCommonStyle & GeoJsonPolygonStyle \| `GeoJsonCommonStyle` & `GeoJsonMixStyle`\> = `DefaultGeoJsonRenderOptions`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:13](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L13)

***

### name

> `readonly` **name**: `string`

Defined in: dde-earth/dist/typings/index.d.ts:202

plugin name, do not repeat, will appear in warnings or errors

#### Inherited from

`BasePlugin.name`

***

### options?

> `readonly` `optional` **options**: `Options`\<`any`\>

Defined in: dde-earth/dist/typings/index.d.ts:200

#### Inherited from

`BasePlugin.options`

## Accessors

### earth

#### Get Signature

> **get** **earth**(): `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:208

##### Returns

`Earth`

#### Inherited from

`BasePlugin.earth`

***

### enable

#### Get Signature

> **get** **enable**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:211

get or set plugin's enable

##### Returns

`boolean`

#### Set Signature

> **set** **enable**(`val`): `void`

Defined in: dde-earth/dist/typings/index.d.ts:212

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Inherited from

`BasePlugin.enable`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:213

##### Returns

`boolean`

#### Inherited from

`BasePlugin.isDestroyed`

***

### viewer

#### Get Signature

> **get** **viewer**(): `Viewer`

Defined in: dde-earth/dist/typings/index.d.ts:209

##### Returns

`Viewer`

#### Inherited from

`BasePlugin.viewer`

## Methods

### \_init()

> `protected` **\_init**(`_earth`): `void`

Defined in: dde-earth/dist/typings/index.d.ts:216

should be executed when implement init function

#### Parameters

##### \_earth

`Earth`

#### Returns

`void`

#### Inherited from

`BasePlugin._init`

***

### destroy()

> **destroy**(): `void`

Defined in: dde-earth/dist/typings/index.d.ts:220

#### Returns

`void`

#### Inherited from

`BasePlugin.destroy`

***

### init()

> **init**(`earth`): `GeoJsonLayerLoader`

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:15](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L15)

#### Parameters

##### earth

`Earth`

#### Returns

`GeoJsonLayerLoader`

#### Overrides

`BasePlugin.init`
