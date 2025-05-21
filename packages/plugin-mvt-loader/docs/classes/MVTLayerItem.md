[**MVT Loader Plugin API**](../README.md)

***

[MVT Loader Plugin API](../README.md) / MVTLayerItem

# Class: MVTLayerItem

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:13](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L13)

## Extends

- `LayerItem`\<[`Data`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/Data.md), [`Instance`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/Instance.md)\>

## Constructors

### Constructor

> **new MVTLayerItem**(`earth`, `data`, `options?`): `MVTLayerItem`

Defined in: dde-earth/dist/typings/index.d.ts:123

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/Data.md)

##### options?

`Options`\<`BaseLayer`\<`string`, `any`\>\>

#### Returns

`MVTLayerItem`

#### Inherited from

`LayerItem< MVTLayerItem.Data, MVTLayerItem.Instance >.constructor`

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

> `protected` `optional` **\_renderOptions**: [`BasicRenderOptions`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/BasicRenderOptions.md)

Defined in: dde-earth/dist/typings/index.d.ts:116

#### Inherited from

`LayerItem._renderOptions`

***

### data

> `readonly` **data**: [`Data`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/Data.md)

Defined in: dde-earth/dist/typings/index.d.ts:109

#### Inherited from

`LayerItem.data`

***

### defaultRenderOptions

> **defaultRenderOptions**: [`BasicRenderOptions`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/BasicRenderOptions.md)

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:17](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L17)

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

> `readonly` **method**: `"mvt"`

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

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:18](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L18)

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`val`): `void`

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:22](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L22)

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

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:26](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L26)

#### Parameters

##### data

[`Data`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<`ImageryLayer`\>

#### Overrides

`LayerItem._init`

***

### \_remove()

> **\_remove**(): `boolean`

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:36](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L36)

#### Returns

`boolean`

#### Overrides

`LayerItem._remove`

***

### \_render()

> **\_render**(`options`): `Promise`\<`undefined` \| `ImageryLayer`\>

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:51](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L51)

#### Parameters

##### options

[`BasicRenderOptions`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/BasicRenderOptions.md)

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

> **initial**(): `Promise`\<`MVTLayerItem`\>

Defined in: dde-earth/dist/typings/index.d.ts:124

#### Returns

`Promise`\<`MVTLayerItem`\>

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

`undefined` | [`BasicRenderOptions`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/BasicRenderOptions.md)

#### Returns

`Promise`\<`undefined` \| `ImageryLayer`\>

#### Inherited from

`LayerItem.render`

***

### zoomTo()

> **zoomTo**(): `void`

Defined in: [plugin-mvt-loader/src/MVTLayerItem.ts:43](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerItem.ts#L43)

#### Returns

`void`

#### Overrides

`LayerItem.zoomTo`
