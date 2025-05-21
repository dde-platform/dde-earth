[**Recommended Plugins API**](../README.md)

***

[Recommended Plugins API](../README.md) / Subscriber

# Class: Subscriber

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:8](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L8)

## Extends

- `WithEventPlugin`\<[`Args`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Args.md), [`Intl`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Intl.md)\>

## Constructors

### Constructor

> **new Subscriber**(`options?`): `Subscriber`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:42](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L42)

#### Parameters

##### options?

`Options`\<[`Intl`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Intl.md)\>

#### Returns

`Subscriber`

#### Overrides

`WithEventPlugin< Subscriber.Args, Subscriber.Intl >.constructor`

## Properties

### \_earth

> `protected` **\_earth**: `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:205

#### Inherited from

`WithEventPlugin._earth`

***

### \_enable

> `protected` **\_enable**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:206

#### Inherited from

`WithEventPlugin._enable`

***

### \_getT

> `protected` **\_getT**: `TranslateFunc`\<[`Intl`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Intl.md)\>

Defined in: dde-earth/dist/typings/index.d.ts:219

get translation's api

#### Inherited from

`WithEventPlugin._getT`

***

### \_intl

> `protected` **\_intl**: `ExtendMessages`\<[`Intl`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Intl.md)\>

Defined in: dde-earth/dist/typings/index.d.ts:204

Internationalized Dictionary

#### Inherited from

`WithEventPlugin._intl`

***

### \_isDestroyed

> `protected` **\_isDestroyed**: `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:207

#### Inherited from

`WithEventPlugin._isDestroyed`

***

### eventList

> `readonly` **eventList**: (`"LEFT_DOWN"` \| `"LEFT_UP"` \| `"LEFT_CLICK"` \| `"LEFT_DOUBLE_CLICK"` \| `"RIGHT_DOWN"` \| `"RIGHT_UP"` \| `"RIGHT_CLICK"` \| `"MIDDLE_DOWN"` \| `"MIDDLE_UP"` \| `"MIDDLE_CLICK"` \| `"MOUSE_MOVE"` \| `"WHEEL"` \| `"PINCH_START"` \| `"PINCH_END"` \| `"PINCH_MOVE"`)[]

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:14](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L14)

#### Overrides

`WithEventPlugin.eventList`

***

### name

> **name**: `string` = `"Subscriber"`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:12](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L12)

plugin name, do not repeat, will appear in warnings or errors

#### Overrides

`WithEventPlugin.name`

***

### options?

> `readonly` `optional` **options**: `Options`\<[`Intl`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/Intl.md)\>

Defined in: dde-earth/dist/typings/index.d.ts:200

#### Inherited from

`WithEventPlugin.options`

## Accessors

### earth

#### Get Signature

> **get** **earth**(): `Earth`

Defined in: dde-earth/dist/typings/index.d.ts:208

##### Returns

`Earth`

#### Inherited from

`WithEventPlugin.earth`

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

`WithEventPlugin.enable`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: dde-earth/dist/typings/index.d.ts:213

##### Returns

`boolean`

#### Inherited from

`WithEventPlugin.isDestroyed`

***

### viewer

#### Get Signature

> **get** **viewer**(): `Viewer`

Defined in: dde-earth/dist/typings/index.d.ts:209

##### Returns

`Viewer`

#### Inherited from

`WithEventPlugin.viewer`

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

`WithEventPlugin._init`

***

### cartesiantoLonlat()

> **cartesiantoLonlat**(`cartesian`, `height?`): `undefined` \| `number`[]

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:144](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L144)

#### Parameters

##### cartesian

`undefined` | `Cartesian2` | `Cartesian3`

##### height?

`number`

#### Returns

`undefined` \| `number`[]

***

### destroy()

> **destroy**(): `void`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:176](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L176)

#### Returns

`void`

#### Overrides

`WithEventPlugin.destroy`

***

### init()

> **init**(`earth`, `options`): `Subscriber`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:46](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L46)

#### Parameters

##### earth

`Earth`

##### options

[`SubscriberOptions`](../Recommended-Plugins-API/namespaces/Subscriber/interfaces/SubscriberOptions.md) = `{}`

#### Returns

`Subscriber`

#### Overrides

`WithEventPlugin.init`

***

### off()

> **off**(`event`, `fn?`): `any`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:114](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L114)

#### Parameters

##### event

`"LEFT_DOWN"` | `"LEFT_UP"` | `"LEFT_CLICK"` | `"LEFT_DOUBLE_CLICK"` | `"RIGHT_DOWN"` | `"RIGHT_UP"` | `"RIGHT_CLICK"` | `"MIDDLE_DOWN"` | `"MIDDLE_UP"` | `"MIDDLE_CLICK"` | `"MOUSE_MOVE"` | `"WHEEL"` | `"PINCH_START"` | `"PINCH_END"` | `"PINCH_MOVE"`

##### fn?

[`ExternalListenCallback`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/ExternalListenCallback.md)

#### Returns

`any`

#### Overrides

`WithEventPlugin.off`

***

### on()

> **on**(`event`, `fn`): `any`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:107](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L107)

#### Parameters

##### event

`"LEFT_DOWN"` | `"LEFT_UP"` | `"LEFT_CLICK"` | `"LEFT_DOUBLE_CLICK"` | `"RIGHT_DOWN"` | `"RIGHT_UP"` | `"RIGHT_CLICK"` | `"MIDDLE_DOWN"` | `"MIDDLE_UP"` | `"MIDDLE_CLICK"` | `"MOUSE_MOVE"` | `"WHEEL"` | `"PINCH_START"` | `"PINCH_END"` | `"PINCH_MOVE"`

##### fn

[`ExternalListenCallback`](../Recommended-Plugins-API/namespaces/Subscriber/type-aliases/ExternalListenCallback.md)

#### Returns

`any`

#### Overrides

`WithEventPlugin.on`

***

### removeNative()

> **removeNative**(`viewer`, `eventType`): `void`

Defined in: [recommend-plugins/src/plugins/subscriber/Subscriber.ts:132](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/subscriber/Subscriber.ts#L132)

#### Parameters

##### viewer

`Viewer`

##### eventType

`"LEFT_DOWN"` | `"LEFT_UP"` | `"LEFT_CLICK"` | `"LEFT_DOUBLE_CLICK"` | `"RIGHT_DOWN"` | `"RIGHT_UP"` | `"RIGHT_CLICK"` | `"MIDDLE_DOWN"` | `"MIDDLE_UP"` | `"MIDDLE_CLICK"` | `"MOUSE_MOVE"` | `"WHEEL"` | `"PINCH_START"` | `"PINCH_END"` | `"PINCH_MOVE"`

#### Returns

`void`
