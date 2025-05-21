[**FeatureClick Plugin API**](../README.md)

***

[FeatureClick Plugin API](../README.md) / FeatureClick

# Class: FeatureClick

Defined in: [plugin-feature-click/src/index.ts:12](https://github.com/dde-platform/dde-earth/blob/95a2d7b4cdbc7cbacec37c612f4785009d37de4e/packages/plugin-feature-click/src/index.ts#L12)

## Extends

- `BasePlugin`\<[`Args`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Args.md), [`Intl`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Intl.md)\>

## Constructors

### Constructor

> **new FeatureClick**(`options?`): `FeatureClick`

Defined in: dde-earth/dist/typings/index.d.ts:214

#### Parameters

##### options?

`Options`\<[`Intl`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Intl.md)\>

#### Returns

`FeatureClick`

#### Inherited from

`BasePlugin< FeatureClick.Args, FeatureClick.Intl >.constructor`

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

> `protected` **\_getT**: `TranslateFunc`\<[`Intl`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Intl.md)\>

Defined in: dde-earth/dist/typings/index.d.ts:219

get translation's api

#### Inherited from

`BasePlugin._getT`

***

### \_intl

> `protected` **\_intl**: `ExtendMessages`\<[`Intl`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Intl.md)\>

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

### name

> **name**: `string` = `"FeatureClick"`

Defined in: [plugin-feature-click/src/index.ts:16](https://github.com/dde-platform/dde-earth/blob/95a2d7b4cdbc7cbacec37c612f4785009d37de4e/packages/plugin-feature-click/src/index.ts#L16)

plugin name, do not repeat, will appear in warnings or errors

#### Overrides

`BasePlugin.name`

***

### options?

> `readonly` `optional` **options**: `Options`\<[`Intl`](../FeatureClick-Plugin-API/namespaces/FeatureClick/type-aliases/Intl.md)\>

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

### addListner()

> **addListner**(): `void`

Defined in: [plugin-feature-click/src/index.ts:28](https://github.com/dde-platform/dde-earth/blob/95a2d7b4cdbc7cbacec37c612f4785009d37de4e/packages/plugin-feature-click/src/index.ts#L28)

#### Returns

`void`

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

> **init**(`earth`): `FeatureClick`

Defined in: [plugin-feature-click/src/index.ts:20](https://github.com/dde-platform/dde-earth/blob/95a2d7b4cdbc7cbacec37c612f4785009d37de4e/packages/plugin-feature-click/src/index.ts#L20)

#### Parameters

##### earth

`Earth`

#### Returns

`FeatureClick`

#### Overrides

`BasePlugin.init`
