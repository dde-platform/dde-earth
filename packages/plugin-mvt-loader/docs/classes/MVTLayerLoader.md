[**MVT Loader Plugin API**](../README.md)

***

[MVT Loader Plugin API](../README.md) / MVTLayerLoader

# Class: MVTLayerLoader

Defined in: [plugin-mvt-loader/src/MVTLayerLoader.ts:8](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerLoader.ts#L8)

## Extends

- `BasePlugin`

## Constructors

### Constructor

> **new MVTLayerLoader**(`options?`): `MVTLayerLoader`

Defined in: [plugin-mvt-loader/src/MVTLayerLoader.ts:12](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerLoader.ts#L12)

#### Parameters

##### options?

[`Options`](../MVT-Loader-Plugin-API/namespaces/MVTLayerLoader/interfaces/Options.md)

#### Returns

`MVTLayerLoader`

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

> `readonly` **defaultRenderOptions**: `Required`\<[`BasicRenderOptions`](../MVT-Loader-Plugin-API/namespaces/MVTLayerItem/type-aliases/BasicRenderOptions.md)\>

Defined in: [plugin-mvt-loader/src/MVTLayerLoader.ts:9](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerLoader.ts#L9)

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

> **init**(`earth`): `MVTLayerLoader`

Defined in: [plugin-mvt-loader/src/MVTLayerLoader.ts:20](https://github.com/dde-platform/dde-earth/blob/a4e76810cf18d8354b0eaa68b6b086181f8a3f8a/packages/plugin-mvt-loader/src/MVTLayerLoader.ts#L20)

#### Parameters

##### earth

`Earth`

#### Returns

`MVTLayerLoader`

#### Overrides

`BasePlugin.init`
