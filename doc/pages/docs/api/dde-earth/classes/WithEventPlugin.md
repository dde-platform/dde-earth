[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / WithEventPlugin

# Class: `abstract` WithEventPlugin\<InitOptions, Intl, Events, Args\>

Defined in: [core/plugin/withEventPlugin.ts:3](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/withEventPlugin.ts#L3)

## Extends

- [`BasePlugin`](BasePlugin.md)\<`InitOptions`, `Intl`\>

## Type Parameters

### InitOptions

`InitOptions` *extends* `any`[] = `any`[]

### Intl

`Intl` *extends* `Record`\<`string`, `any`\> = `any`

### Events

`Events` *extends* `string` = `string`

### Args

`Args` *extends* `any`[] = \[\]

## Constructors

### Constructor

> **new WithEventPlugin**\<`InitOptions`, `Intl`, `Events`, `Args`\>(`options?`): `WithEventPlugin`\<`InitOptions`, `Intl`, `Events`, `Args`\>

Defined in: [core/plugin/withEventPlugin.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/withEventPlugin.ts#L11)

#### Parameters

##### options?

[`Options`](../dde-earth/namespaces/WithEventPlugin/interfaces/Options.md)\<`Intl`\>

#### Returns

`WithEventPlugin`\<`InitOptions`, `Intl`, `Events`, `Args`\>

#### Overrides

[`BasePlugin`](BasePlugin.md).[`constructor`](BasePlugin.md#constructor)

## Properties

### \_earth

> `protected` **\_earth**: [`Earth`](Earth.md)

Defined in: [core/plugin/basePlugin.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L15)

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_earth`](BasePlugin.md#_earth)

***

### \_enable

> `protected` **\_enable**: `boolean` = `true`

Defined in: [core/plugin/basePlugin.ts:16](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L16)

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_enable`](BasePlugin.md#_enable)

***

### \_getT

> `protected` **\_getT**: [`TranslateFunc`](../dde-earth/namespaces/I18N/type-aliases/TranslateFunc.md)\<`Intl`\>

Defined in: [core/plugin/basePlugin.ts:65](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L65)

get translation's api

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_getT`](BasePlugin.md#_gett)

***

### \_intl

> `protected` **\_intl**: [`ExtendMessages`](../dde-earth/namespaces/I18N/type-aliases/ExtendMessages.md)\<`Intl`\> = `{}`

Defined in: [core/plugin/basePlugin.ts:13](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L13)

Internationalized Dictionary

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_intl`](BasePlugin.md#_intl)

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean` = `false`

Defined in: [core/plugin/basePlugin.ts:17](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L17)

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_isDestroyed`](BasePlugin.md#_isdestroyed)

***

### eventList

> `readonly` **eventList**: `Events`[] = `[]`

Defined in: [core/plugin/withEventPlugin.ts:9](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/withEventPlugin.ts#L9)

***

### name

> `readonly` **name**: `string` = `""`

Defined in: [core/plugin/basePlugin.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L11)

plugin name, do not repeat, will appear in warnings or errors

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`name`](BasePlugin.md#name)

***

### options?

> `readonly` `optional` **options**: [`Options`](../dde-earth/namespaces/BasePlugin/interfaces/Options.md)\<`Intl`\>

Defined in: [core/plugin/basePlugin.ts:45](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L45)

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`options`](BasePlugin.md#options)

## Accessors

### earth

#### Get Signature

> **get** **earth**(): [`Earth`](Earth.md)

Defined in: [core/plugin/basePlugin.ts:19](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L19)

##### Returns

[`Earth`](Earth.md)

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`earth`](BasePlugin.md#earth)

***

### enable

#### Get Signature

> **get** **enable**(): `boolean`

Defined in: [core/plugin/basePlugin.ts:33](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L33)

get or set plugin's enable

##### Returns

`boolean`

#### Set Signature

> **set** **enable**(`val`): `void`

Defined in: [core/plugin/basePlugin.ts:37](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L37)

##### Parameters

###### val

`boolean`

##### Returns

`void`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`enable`](BasePlugin.md#enable)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/plugin/basePlugin.ts:41](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L41)

##### Returns

`boolean`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`isDestroyed`](BasePlugin.md#isdestroyed)

***

### viewer

#### Get Signature

> **get** **viewer**(): `Viewer`

Defined in: [core/plugin/basePlugin.ts:28](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L28)

##### Returns

`Viewer`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`viewer`](BasePlugin.md#viewer)

## Methods

### \_init()

> `protected` **\_init**(`_earth`): `void`

Defined in: [core/plugin/basePlugin.ts:54](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L54)

should be executed when implement init function

#### Parameters

##### \_earth

[`Earth`](Earth.md)

#### Returns

`void`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`_init`](BasePlugin.md#_init)

***

### destroy()

> **destroy**(): `void`

Defined in: [core/plugin/basePlugin.ts:67](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L67)

#### Returns

`void`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`destroy`](BasePlugin.md#destroy)

***

### init()

> `abstract` **init**(`_earth`, ...`_options`): `this`

Defined in: [core/plugin/basePlugin.ts:62](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L62)

#### Parameters

##### \_earth

[`Earth`](Earth.md)

##### \_options

...`InitOptions`

#### Returns

`this`

#### Inherited from

[`BasePlugin`](BasePlugin.md).[`init`](BasePlugin.md#init)

***

### off()

> `abstract` **off**(`event`, `fn?`): `any`

Defined in: [core/plugin/withEventPlugin.ts:16](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/withEventPlugin.ts#L16)

#### Parameters

##### event

`Events`

##### fn?

(...`args`) => `void`

#### Returns

`any`

***

### on()

> `abstract` **on**(`event`, `fn`): `any`

Defined in: [core/plugin/withEventPlugin.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/withEventPlugin.ts#L15)

#### Parameters

##### event

`Events`

##### fn

(...`args`) => `void`

#### Returns

`any`
