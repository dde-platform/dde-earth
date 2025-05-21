[**Recommended Plugins API**](../README.md)

***

[Recommended Plugins API](../README.md) / LayerLoaders

# Class: LayerLoaders

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:11](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L11)

## Extends

- `BasePlugin`

## Constructors

### Constructor

> **new LayerLoaders**(`options?`): `LayerLoaders`

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:17](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L17)

#### Parameters

##### options?

[`Options`](../Recommended-Plugins-API/namespaces/LayerLoaders/interfaces/Options.md)

#### Returns

`LayerLoaders`

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

> `readonly` **defaultRenderOptions**: `Required`\<[`ExtractLoaderOptions`](../Recommended-Plugins-API/namespaces/LayerLoaders/type-aliases/ExtractLoaderOptions.md)\<[`Loaders`](../Recommended-Plugins-API/namespaces/LayerLoaders/interfaces/Loaders.md)\>\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:12](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L12)

***

### name

> **name**: `string` = `"LayerLoaders"`

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:15](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L15)

plugin name, do not repeat, will appear in warnings or errors

#### Overrides

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

> **init**(`earth`): `LayerLoaders`

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:25](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L25)

#### Parameters

##### earth

`Earth`

#### Returns

`LayerLoaders`

#### Overrides

`BasePlugin.init`
