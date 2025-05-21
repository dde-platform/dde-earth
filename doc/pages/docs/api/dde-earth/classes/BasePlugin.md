[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / BasePlugin

# Class: `abstract` BasePlugin\<InitOptions, Intl\>

Defined in: [core/plugin/basePlugin.ts:6](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L6)

## Extended by

- [`WithEventPlugin`](WithEventPlugin.md)

## Type Parameters

### InitOptions

`InitOptions` *extends* `any`[] = \[\]

### Intl

`Intl` *extends* `Record`\<`string`, `any`\> = `any`

## Constructors

### Constructor

> **new BasePlugin**\<`InitOptions`, `Intl`\>(`options?`): `BasePlugin`\<`InitOptions`, `Intl`\>

Defined in: [core/plugin/basePlugin.ts:45](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L45)

#### Parameters

##### options?

[`Options`](../dde-earth/namespaces/BasePlugin/interfaces/Options.md)\<`Intl`\>

#### Returns

`BasePlugin`\<`InitOptions`, `Intl`\>

## Properties

### \_earth

> `protected` **\_earth**: [`Earth`](Earth.md)

Defined in: [core/plugin/basePlugin.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L15)

***

### \_enable

> `protected` **\_enable**: `boolean` = `true`

Defined in: [core/plugin/basePlugin.ts:16](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L16)

***

### \_getT

> `protected` **\_getT**: [`TranslateFunc`](../dde-earth/namespaces/I18N/type-aliases/TranslateFunc.md)\<`Intl`\>

Defined in: [core/plugin/basePlugin.ts:65](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L65)

get translation's api

***

### \_intl

> `protected` **\_intl**: [`ExtendMessages`](../dde-earth/namespaces/I18N/type-aliases/ExtendMessages.md)\<`Intl`\> = `{}`

Defined in: [core/plugin/basePlugin.ts:13](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L13)

Internationalized Dictionary

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean` = `false`

Defined in: [core/plugin/basePlugin.ts:17](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L17)

***

### name

> `readonly` **name**: `string` = `""`

Defined in: [core/plugin/basePlugin.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L11)

plugin name, do not repeat, will appear in warnings or errors

***

### options?

> `readonly` `optional` **options**: [`Options`](../dde-earth/namespaces/BasePlugin/interfaces/Options.md)\<`Intl`\>

Defined in: [core/plugin/basePlugin.ts:45](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L45)

## Accessors

### earth

#### Get Signature

> **get** **earth**(): [`Earth`](Earth.md)

Defined in: [core/plugin/basePlugin.ts:19](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L19)

##### Returns

[`Earth`](Earth.md)

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

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/plugin/basePlugin.ts:41](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L41)

##### Returns

`boolean`

***

### viewer

#### Get Signature

> **get** **viewer**(): `Viewer`

Defined in: [core/plugin/basePlugin.ts:28](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L28)

##### Returns

`Viewer`

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

***

### destroy()

> **destroy**(): `void`

Defined in: [core/plugin/basePlugin.ts:67](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/plugin/basePlugin.ts#L67)

#### Returns

`void`

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
