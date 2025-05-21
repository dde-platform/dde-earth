[**TIFF Loader Plugin API**](../README.md)

***

[TIFF Loader Plugin API](../README.md) / TIFFLayerItem

# Class: TIFFLayerItem

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:13](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L13)

## Extends

- `LayerItem`\<[`Data`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/Data.md), [`Instance`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/Instance.md)\>

## Constructors

### Constructor

> **new TIFFLayerItem**(`earth`, `data`, `options?`): `TIFFLayerItem`

Defined in: dde-earth/dist/typings/index.d.ts:123

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/Data.md)

##### options?

`Options`\<`BaseLayer`\<`string`, `any`\>\>

#### Returns

`TIFFLayerItem`

#### Inherited from

`LayerItem< TIFFLayerItem.Data, TIFFLayerItem.Instance >.constructor`

## Properties

### \_instance?

> `protected` `optional` **\_instance**: `ImageryLayer`

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

> `protected` `optional` **\_renderOptions**: [`BasicRenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/BasicRenderOptions.md) & `TIFFImageryProviderRenderOptions`

Defined in: dde-earth/dist/typings/index.d.ts:116

#### Inherited from

`LayerItem._renderOptions`

***

### data

> `readonly` **data**: [`Data`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/Data.md)

Defined in: dde-earth/dist/typings/index.d.ts:109

#### Inherited from

`LayerItem.data`

***

### defaultRenderOptions

> **defaultRenderOptions**: [`RenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/RenderOptions.md)

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:17](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L17)

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

> `readonly` **method**: `"tiff"`

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

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:19](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L19)

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`val`): `void`

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:23](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L23)

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Overrides

`LayerItem.show`

## Methods

### \_init()

> **\_init**(`data`): `Promise`\<`ImageryLayer`\>

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:27](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L27)

#### Parameters

##### data

[`Data`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<`ImageryLayer`\>

#### Overrides

`LayerItem._init`

***

### \_remove()

> **\_remove**(): `boolean`

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:41](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L41)

#### Returns

`boolean`

#### Overrides

`LayerItem._remove`

***

### \_render()

> **\_render**(`options`): `Promise`\<`undefined` \| `ImageryLayer`\>

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:73](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L73)

#### Parameters

##### options

[`RenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/RenderOptions.md)

#### Returns

`Promise`\<`undefined` \| `ImageryLayer`\>

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

> **initial**(): `Promise`\<`TIFFLayerItem`\>

Defined in: dde-earth/dist/typings/index.d.ts:124

#### Returns

`Promise`\<`TIFFLayerItem`\>

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

> **render**(`renderOptions`): `Promise`\<`undefined` \| `ImageryLayer`\>

Defined in: dde-earth/dist/typings/index.d.ts:130

#### Parameters

##### renderOptions

`undefined` | [`BasicRenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/BasicRenderOptions.md) & `TIFFImageryProviderRenderOptions`

#### Returns

`Promise`\<`undefined` \| `ImageryLayer`\>

#### Inherited from

`LayerItem.render`

***

### zoomTo()

> **zoomTo**(`options`): `void`

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:48](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L48)

#### Parameters

##### options

`ZoomToOptions` = `{}`

#### Returns

`void`

#### Overrides

`LayerItem.zoomTo`

***

### basicRender()

> `static` **basicRender**(`layer`, `options`): `void`

Defined in: [plugin-tiff-loader/src/TIFFLayerItem.ts:57](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerItem.ts#L57)

#### Parameters

##### layer

`undefined` | `ImageryLayer`

##### options

[`BasicRenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/BasicRenderOptions.md) = `{}`

#### Returns

`void`
