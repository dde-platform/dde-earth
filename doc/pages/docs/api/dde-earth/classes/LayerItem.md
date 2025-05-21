[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / LayerItem

# Class: `abstract` LayerItem\<Lyr, Instance\>

Defined in: [core/layerItem.ts:7](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L7)

## Type Parameters

### Lyr

`Lyr` *extends* [`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md) = [`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)

### Instance

`Instance` = `any`

## Constructors

### Constructor

> **new LayerItem**\<`Lyr`, `Instance`\>(`earth`, `data`, `options`): `LayerItem`\<`Lyr`, `Instance`\>

Defined in: [core/layerItem.ts:39](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L39)

#### Parameters

##### earth

[`Earth`](Earth.md)

##### data

`Lyr`

##### options

[`Options`](../dde-earth/namespaces/LayerItem/interfaces/Options.md) = `{}`

#### Returns

`LayerItem`\<`Lyr`, `Instance`\>

## Properties

### \_instance?

> `protected` `optional` **\_instance**: `Instance`

Defined in: [core/layerItem.ts:13](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L13)

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean` = `false`

Defined in: [core/layerItem.ts:16](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L16)

***

### \_ready

> `protected` **\_ready**: `boolean` = `false`

Defined in: [core/layerItem.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L15)

***

### \_renderOptions?

> `protected` `optional` **\_renderOptions**: `Lyr`\[`"renderOptions"`\]

Defined in: [core/layerItem.ts:18](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L18)

***

### data

> `readonly` **data**: `Lyr`

Defined in: [core/layerItem.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L11)

***

### defaultRenderOptions

> `abstract` `protected` `readonly` **defaultRenderOptions**: `Lyr`\[`"renderOptions"`\]

Defined in: [core/layerItem.ts:17](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L17)

***

### earth

> `readonly` **earth**: [`Earth`](Earth.md)

Defined in: [core/layerItem.ts:40](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L40)

***

### id

> `readonly` **id**: `any`

Defined in: [core/layerItem.ts:14](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L14)

***

### method

> `readonly` **method**: `Lyr`\[`"method"`\]

Defined in: [core/layerItem.ts:12](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L12)

***

### options

> `readonly` **options**: [`Options`](../dde-earth/namespaces/LayerItem/interfaces/Options.md) = `{}`

Defined in: [core/layerItem.ts:42](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L42)

## Accessors

### instance

#### Get Signature

> **get** **instance**(): `undefined` \| `Instance`

Defined in: [core/layerItem.ts:35](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L35)

##### Returns

`undefined` \| `Instance`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/layerItem.ts:24](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L24)

##### Returns

`boolean`

***

### ready

#### Get Signature

> **get** **ready**(): `boolean`

Defined in: [core/layerItem.ts:28](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L28)

##### Returns

`boolean`

***

### renderOptions

#### Get Signature

> **get** **renderOptions**(): `undefined` \| `Lyr`\[`"renderOptions"`\]

Defined in: [core/layerItem.ts:20](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L20)

##### Returns

`undefined` \| `Lyr`\[`"renderOptions"`\]

***

### show

#### Get Signature

> **get** `abstract` **show**(): `boolean`

Defined in: [core/layerItem.ts:32](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L32)

##### Returns

`boolean`

#### Set Signature

> **set** `abstract` **show**(`value`): `void`

Defined in: [core/layerItem.ts:33](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L33)

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### \_init()

> `abstract` `protected` **\_init**(`data`): `Promise`\<`Instance`\>

Defined in: [core/layerItem.ts:59](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L59)

#### Parameters

##### data

`Lyr`

#### Returns

`Promise`\<`Instance`\>

***

### \_remove()

> `abstract` `protected` **\_remove**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [core/layerItem.ts:61](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L61)

#### Returns

`boolean` \| `Promise`\<`boolean`\>

***

### \_render()

> `abstract` `protected` **\_render**(`renderOptions`): `Promise`\<`undefined` \| `Instance`\>

Defined in: [core/layerItem.ts:70](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L70)

#### Parameters

##### renderOptions

`Lyr`\[`"renderOptions"`\]

#### Returns

`Promise`\<`undefined` \| `Instance`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [core/layerItem.ts:82](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L82)

#### Returns

`void`

***

### initial()

> **initial**(): `Promise`\<`LayerItem`\<`Lyr`, `Instance`\>\>

Defined in: [core/layerItem.ts:53](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L53)

#### Returns

`Promise`\<`LayerItem`\<`Lyr`, `Instance`\>\>

***

### remove()

> **remove**(): `Promise`\<`boolean`\>

Defined in: [core/layerItem.ts:62](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L62)

#### Returns

`Promise`\<`boolean`\>

***

### render()

> **render**(`renderOptions`): `Promise`\<`undefined` \| `Instance`\>

Defined in: [core/layerItem.ts:73](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L73)

#### Parameters

##### renderOptions

`Lyr`\[`"renderOptions"`\]

#### Returns

`Promise`\<`undefined` \| `Instance`\>

***

### zoomTo()

> `abstract` **zoomTo**(`options?`): `void`

Defined in: [core/layerItem.ts:60](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerItem.ts#L60)

#### Parameters

##### options?

[`ZoomToOptions`](../dde-earth/namespaces/LayerItem/type-aliases/ZoomToOptions.md)

#### Returns

`void`
