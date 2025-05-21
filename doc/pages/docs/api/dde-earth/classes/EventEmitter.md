[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / EventEmitter

# Class: EventEmitter

Defined in: [core/event.ts:3](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L3)

## Constructors

### Constructor

> **new EventEmitter**(): `EventEmitter`

#### Returns

`EventEmitter`

## Properties

### callbacks

> **callbacks**: `object`

Defined in: [core/event.ts:4](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L4)

#### Index Signature

\[`key`: `string`\]: `Function`[]

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [core/event.ts:49](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L49)

#### Returns

`void`

***

### emit()

> **emit**\<`T`\>(`event`, ...`args`): `this`

Defined in: [core/event.ts:19](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L19)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

##### args

...[`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)\[`T`\]

#### Returns

`this`

***

### off()

> **off**\<`T`\>(`event`, `fn?`): `this`

Defined in: [core/event.ts:32](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L32)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

##### fn?

[`EventFunc`](../dde-earth/namespaces/Earth/type-aliases/EventFunc.md)\<`T`\>

#### Returns

`this`

***

### on()

> **on**\<`T`\>(`event`, `fn`): `this`

Defined in: [core/event.ts:6](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/event.ts#L6)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md) = keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

##### fn

[`EventFunc`](../dde-earth/namespaces/Earth/type-aliases/EventFunc.md)\<`T`\>

#### Returns

`this`
