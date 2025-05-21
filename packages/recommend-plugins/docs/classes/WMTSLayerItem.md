[**Recommended Plugins API**](../README.md)

***

[Recommended Plugins API](../README.md) / WMTSLayerItem

# Class: WMTSLayerItem

Defined in: [recommend-plugins/src/plugins/layerLoaders/WMTSLayerItem.ts:5](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/WMTSLayerItem.ts#L5)

## Extends

- `RasterLayerItem`\<[`Data`](../Recommended-Plugins-API/namespaces/WMTSLayerItem/type-aliases/Data.md)\>

## Constructors

### Constructor

> **new WMTSLayerItem**(`earth`, `data`, `options?`): `WMTSLayerItem`

Defined in: dde-earth/dist/typings/index.d.ts:123

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../Recommended-Plugins-API/namespaces/WMTSLayerItem/type-aliases/Data.md)

##### options?

`Options`\<`BaseLayer`\<`string`, `any`\>\>

#### Returns

`WMTSLayerItem`

#### Inherited from

`RasterLayerItem<WMTSLayerItem.Data>.constructor`

## Properties

### \_instance?

> `protected` `optional` **\_instance**: `ImageryLayer`

Defined in: dde-earth/dist/typings/index.d.ts:111

#### Inherited from

`RasterLayerItem._instance`

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:114

#### Inherited from

`RasterLayerItem._isDestroyed`

***

### \_ready

> `protected` **\_ready**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:113

#### Inherited from

`RasterLayerItem._ready`

***

### \_renderOptions?

> `protected` `optional` **\_renderOptions**: `RenderOptions`

Defined in: dde-earth/dist/typings/index.d.ts:116

#### Inherited from

`RasterLayerItem._renderOptions`

***

### data

> `readonly` **data**: [`Data`](../Recommended-Plugins-API/namespaces/WMTSLayerItem/type-aliases/Data.md)

Defined in: dde-earth/dist/typings/index.d.ts:109

#### Inherited from

`RasterLayerItem.data`

***

### defaultRenderOptions

> **defaultRenderOptions**: `RenderOptions` = `DefaultRenderOptions.raster`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:15](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L15)

#### Inherited from

`RasterLayerItem.defaultRenderOptions`

***

### earth

> `readonly` **earth**: `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:107

#### Inherited from

`RasterLayerItem.earth`

***

### id

> `readonly` **id**: `any`

Defined in: dde-earth/dist/typings/index.d.ts:112

#### Inherited from

`RasterLayerItem.id`

***

### method

> `readonly` **method**: `"wmts"`

Defined in: dde-earth/dist/typings/index.d.ts:110

#### Inherited from

`RasterLayerItem.method`

***

### options

> `readonly` **options**: `Options`

Defined in: dde-earth/dist/typings/index.d.ts:108

#### Inherited from

`RasterLayerItem.options`

## Accessors

### instance

#### Get Signature

> **get** **instance**(): `undefined` \| `Instance`

Defined in: dde-earth/dist/typings/index.d.ts:122

##### Returns

`undefined` \| `Instance`

#### Inherited from

`RasterLayerItem.instance`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:118

##### Returns

`boolean`

#### Inherited from

`RasterLayerItem.isDestroyed`

***

### ready

#### Get Signature

> **get** **ready**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:119

##### Returns

`boolean`

#### Inherited from

`RasterLayerItem.ready`

***

### renderOptions

#### Get Signature

> **get** **renderOptions**(): `undefined` \| `Lyr`\[`"renderOptions"`\]

Defined in: dde-earth/dist/typings/index.d.ts:117

##### Returns

`undefined` \| `Lyr`\[`"renderOptions"`\]

#### Inherited from

`RasterLayerItem.renderOptions`

***

### show

#### Get Signature

> **get** **show**(): `boolean`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:17](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L17)

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`val`): `void`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:21](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L21)

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Inherited from

`RasterLayerItem.show`

## Methods

### \_init()

> **\_init**(`data`): `Promise`\<`ImageryLayer`\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/WMTSLayerItem.ts:6](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/WMTSLayerItem.ts#L6)

#### Parameters

##### data

[`Data`](../Recommended-Plugins-API/namespaces/WMTSLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<`ImageryLayer`\>

#### Overrides

`RasterLayerItem._init`

***

### \_remove()

> **\_remove**(): `boolean`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:25](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L25)

#### Returns

`boolean`

#### Inherited from

`RasterLayerItem._remove`

***

### \_render()

> **\_render**(`options`): `Promise`\<`undefined` \| `ImageryLayer`\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:54](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L54)

#### Parameters

##### options

`RenderOptions`

#### Returns

`Promise`\<`undefined` \| `ImageryLayer`\>

#### Inherited from

`RasterLayerItem._render`

***

### destroy()

> **destroy**(): `void`

Defined in: dde-earth/dist/typings/index.d.ts:131

#### Returns

`void`

#### Inherited from

`RasterLayerItem.destroy`

***

### handleData()

> **handleData**\<`T`\>(`data`): `T` & `object`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:40](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L40)

#### Type Parameters

##### T

`T` *extends* `Data`\<`any`, `any`\>

#### Parameters

##### data

`T`

#### Returns

`T` & `object`

#### Inherited from

`RasterLayerItem.handleData`

***

### initial()

> **initial**(): `Promise`\<`WMTSLayerItem`\>

Defined in: dde-earth/dist/typings/index.d.ts:124

#### Returns

`Promise`\<`WMTSLayerItem`\>

#### Inherited from

`RasterLayerItem.initial`

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: dde-earth/dist/typings/index.d.ts:128

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

`RasterLayerItem.remove`

***

### render()

> **render**(`renderOptions`): `Promise`\<`undefined` \| `ImageryLayer`\>

Defined in: dde-earth/dist/typings/index.d.ts:130

#### Parameters

##### renderOptions

`undefined` | `RenderOptions`

#### Returns

`Promise`\<`undefined` \| `ImageryLayer`\>

#### Inherited from

`RasterLayerItem.render`

***

### zoomTo()

> **zoomTo**(): `void`

Defined in: [recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts:32](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/RasterLayerItem.ts#L32)

#### Returns

`void`

#### Inherited from

`RasterLayerItem.zoomTo`
