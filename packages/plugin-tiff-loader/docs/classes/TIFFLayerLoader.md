[**TIFF Loader Plugin API**](../README.md)

***

[TIFF Loader Plugin API](../README.md) / TIFFLayerLoader

# Class: TIFFLayerLoader

Defined in: [plugin-tiff-loader/src/TIFFLayerLoader.ts:8](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerLoader.ts#L8)

## Extends

- `BasePlugin`

## Constructors

### Constructor

> **new TIFFLayerLoader**(`options?`): `TIFFLayerLoader`

Defined in: [plugin-tiff-loader/src/TIFFLayerLoader.ts:12](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerLoader.ts#L12)

#### Parameters

##### options?

[`Options`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerLoader/interfaces/Options.md)

#### Returns

`TIFFLayerLoader`

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

> `readonly` **defaultRenderOptions**: `Required`\<[`RenderOptions`](../TIFF-Loader-Plugin-API/namespaces/TIFFLayerItem/type-aliases/RenderOptions.md)\>

Defined in: [plugin-tiff-loader/src/TIFFLayerLoader.ts:9](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerLoader.ts#L9)

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

> **init**(`earth`): `TIFFLayerLoader`

Defined in: [plugin-tiff-loader/src/TIFFLayerLoader.ts:20](https://github.com/dde-platform/dde-earth/blob/1c662e264951e9ef40c572b3bb6146b318e5a126/packages/plugin-tiff-loader/src/TIFFLayerLoader.ts#L20)

#### Parameters

##### earth

`Earth`

#### Returns

`TIFFLayerLoader`

#### Overrides

`BasePlugin.init`
