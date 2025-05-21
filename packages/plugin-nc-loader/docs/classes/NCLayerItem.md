[**NC Loader Plugin API**](../README.md)

***

[NC Loader Plugin API](../README.md) / NCLayerItem

# Class: NCLayerItem

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:9](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L9)

## Extends

- `LayerItem`\<[`Data`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/Data.md), [`Instance`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/Instance.md)\>

## Constructors

### Constructor

> **new NCLayerItem**(`earth`, `data`, `options?`): `NCLayerItem`

Defined in: dde-earth/dist/typings/index.d.ts:123

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/Data.md)

##### options?

`Options`\<`BaseLayer`\<`string`, `any`\>\>

#### Returns

`NCLayerItem`

#### Inherited from

`LayerItem< NCLayerItem.Data, NCLayerItem.Instance >.constructor`

## Properties

### \_instance?

> `protected` `optional` **\_instance**: `Particle3D`

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

> `protected` `optional` **\_renderOptions**: [`NCImageryProviderRenderOptions`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/NCImageryProviderRenderOptions.md)

Defined in: dde-earth/dist/typings/index.d.ts:116

#### Inherited from

`LayerItem._renderOptions`

***

### data

> `readonly` **data**: [`Data`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/Data.md)

Defined in: dde-earth/dist/typings/index.d.ts:109

#### Inherited from

`LayerItem.data`

***

### defaultRenderOptions

> **defaultRenderOptions**: [`NCImageryProviderRenderOptions`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/NCImageryProviderRenderOptions.md)

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:13](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L13)

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

### inputFile

> **inputFile**: `Blob` \| `JsonData`

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:14](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L14)

***

### method

> `readonly` **method**: `"nc"`

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

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:16](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L16)

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`val`): `void`

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:21](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L21)

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Overrides

`LayerItem.show`

## Methods

### \_init()

> **\_init**(`data`): `Promise`\<`Particle3D`\>

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:31](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L31)

#### Parameters

##### data

[`Data`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<`Particle3D`\>

#### Overrides

`LayerItem._init`

***

### \_remove()

> **\_remove**(): `boolean`

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:61](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L61)

#### Returns

`boolean`

#### Overrides

`LayerItem._remove`

***

### \_render()

> **\_render**(`options`): `Promise`\<`undefined` \| `Particle3D`\>

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:78](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L78)

#### Parameters

##### options

[`NCImageryProviderRenderOptions`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/NCImageryProviderRenderOptions.md)

#### Returns

`Promise`\<`undefined` \| `Particle3D`\>

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

> **initial**(): `Promise`\<`NCLayerItem`\>

Defined in: dde-earth/dist/typings/index.d.ts:124

#### Returns

`Promise`\<`NCLayerItem`\>

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

> **render**(`renderOptions`): `Promise`\<`undefined` \| `Particle3D`\>

Defined in: dde-earth/dist/typings/index.d.ts:130

#### Parameters

##### renderOptions

`undefined` | [`NCImageryProviderRenderOptions`](../NC-Loader-Plugin-API/namespaces/NCLayerItem/type-aliases/NCImageryProviderRenderOptions.md)

#### Returns

`Promise`\<`undefined` \| `Particle3D`\>

#### Inherited from

`LayerItem.render`

***

### zoomTo()

> **zoomTo**(): `void`

Defined in: [plugin-nc-loader/src/NCLayerItem.ts:70](https://github.com/dde-platform/dde-earth/blob/23077819a02f2f5bc245855ed0ddaabd6e677e95/packages/plugin-nc-loader/src/NCLayerItem.ts#L70)

#### Returns

`void`

#### Overrides

`LayerItem.zoomTo`
