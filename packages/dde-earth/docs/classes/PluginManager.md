[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / PluginManager

# Class: PluginManager

Defined in: [core/pluginManager.ts:9](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L9)

## Constructors

### Constructor

> **new PluginManager**(`earth`, `plugins`): `PluginManager`

Defined in: [core/pluginManager.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L11)

#### Parameters

##### earth

[`Earth`](Earth.md)

##### plugins

`Record`\<`string`, [`IPlugin`](../type-aliases/IPlugin.md)\> = `{}`

#### Returns

`PluginManager`

## Properties

### earth

> `readonly` **earth**: [`Earth`](Earth.md)

Defined in: [core/pluginManager.ts:12](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L12)

***

### plugins

> `readonly` **plugins**: `Record`\<`string`, [`IPlugin`](../type-aliases/IPlugin.md)\> = `{}`

Defined in: [core/pluginManager.ts:13](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L13)

## Accessors

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/pluginManager.ts:16](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L16)

##### Returns

`boolean`

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [core/pluginManager.ts:76](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L76)

#### Returns

`void`

***

### get()

> **get**\<`T`\>(`param`): `undefined` \| `T`

Defined in: [core/pluginManager.ts:32](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L32)

#### Type Parameters

##### T

`T` *extends* [`IPlugin`](../type-aliases/IPlugin.md) = [`IPlugin`](../type-aliases/IPlugin.md)

#### Parameters

##### param

`string` | `Function`

#### Returns

`undefined` \| `T`

***

### getPluginWithEvent()

> **getPluginWithEvent**\<`T`\>(`event`): `undefined` \| [`WithEventPlugin`](WithEventPlugin.md)\<`any`[], `any`, `T`, [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)\[`T`\]\>

Defined in: [core/pluginManager.ts:54](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L54)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md) = keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

#### Returns

`undefined` \| [`WithEventPlugin`](WithEventPlugin.md)\<`any`[], `any`, `T`, [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)\[`T`\]\>

***

### remove()

> **remove**(`name`): `void`

Defined in: [core/pluginManager.ts:68](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L68)

#### Parameters

##### name

`string` | `string`[]

#### Returns

`void`

***

### use()

> **use**\<`T`\>(`plugin`, ...`options`): `T`

Defined in: [core/pluginManager.ts:20](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/pluginManager.ts#L20)

#### Type Parameters

##### T

`T` *extends* [`IPlugin`](../type-aliases/IPlugin.md)

#### Parameters

##### plugin

`T`

##### options

...[`Tail`](../type-aliases/Tail.md)\<`Parameters`\<`T`\[`"init"`\]\>\>

#### Returns

`T`
