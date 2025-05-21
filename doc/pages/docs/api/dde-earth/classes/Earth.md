[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / Earth

# Class: Earth

Defined in: [core/earth.ts:18](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L18)

## Constructors

### Constructor

> **new Earth**(`container`, `options?`): `Earth`

Defined in: [core/earth.ts:29](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L29)

#### Parameters

##### container

`string` | `Viewer` | `Element`

##### options?

[`EarthOptions`](../dde-earth/namespaces/Earth/type-aliases/EarthOptions.md)

#### Returns

`Earth`

## Properties

### addLayer()

> **addLayer**: \<`Method`\>(`data`, `options?`) => `Promise`\<`undefined` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/LayerManager/interfaces/Loaders.md)\>\[`Method`\]\[`"layerItem"`\]\>\>

Defined in: [core/earth.ts:161](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L161)

add layer using layer loader

#### Type Parameters

##### Method

`Method` *extends* `never`

#### Parameters

##### data

`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/LayerManager/interfaces/Loaders.md)\>\[`Method`\]\[`"data"`\]

##### options?

[`AddLayerOptions`](../dde-earth/namespaces/LayerManager/interfaces/AddLayerOptions.md)

#### Returns

`Promise`\<`undefined` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/LayerManager/interfaces/Loaders.md)\>\[`Method`\]\[`"layerItem"`\]\>\>

***

### container

> `readonly` **container**: `string` \| `Viewer` \| `Element`

Defined in: [core/earth.ts:30](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L30)

***

### emit()

> **emit**: \<`T`\>(`event`, ...`args`) => `this`

Defined in: [core/earth.ts:154](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L154)

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

### eventEmitter

> `readonly` **eventEmitter**: [`EventEmitter`](EventEmitter.md)

Defined in: [core/earth.ts:26](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L26)

***

### getPlugin()

> **getPlugin**: \<`T`\>(`param`) => `undefined` \| `T`

Defined in: [core/earth.ts:157](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L157)

#### Type Parameters

##### T

`T` *extends* [`IPlugin`](../type-aliases/IPlugin.md) = [`IPlugin`](../type-aliases/IPlugin.md)

#### Parameters

##### param

`string` | `Function`

#### Returns

`undefined` \| `T`

***

### i18n

> `readonly` **i18n**: [`I18N`](I18N.md)

Defined in: [core/earth.ts:24](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L24)

***

### layerManager

> `readonly` **layerManager**: [`LayerManager`](LayerManager.md)

Defined in: [core/earth.ts:25](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L25)

***

### options

> `readonly` **options**: [`EarthOptions`](../dde-earth/namespaces/Earth/type-aliases/EarthOptions.md)

Defined in: [core/earth.ts:22](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L22)

***

### pluginManager

> `readonly` **pluginManager**: [`PluginManager`](PluginManager.md)

Defined in: [core/earth.ts:23](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L23)

***

### removeLayer()

> **removeLayer**: (`param`) => `Promise`\<`boolean`\>

Defined in: [core/earth.ts:162](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L162)

remove layer from the layer list

#### Parameters

##### param

layerName or LayerItem object

`string` | [`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

#### Returns

`Promise`\<`boolean`\>

removed successfully or not

***

### removePlugin()

> **removePlugin**: (`name`) => `void`

Defined in: [core/earth.ts:158](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L158)

#### Parameters

##### name

`string` | `string`[]

#### Returns

`void`

***

### setTerrain()

> **setTerrain**: \<`Method`\>(`data?`) => `Promise`\<`undefined` \| `EllipsoidTerrainProvider` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"instance"`\]\>\>

Defined in: [core/earth.ts:165](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L165)

set terrain using terrain loader

#### Type Parameters

##### Method

`Method` *extends* `"cesium"`

#### Parameters

##### data?

`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"data"`\]

#### Returns

`Promise`\<`undefined` \| `EllipsoidTerrainProvider` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"instance"`\]\>\>

***

### terrainManager

> `readonly` **terrainManager**: [`TerrainManager`](TerrainManager.md)

Defined in: [core/earth.ts:27](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L27)

***

### usePlugin()

> **usePlugin**: \<`T`\>(`plugin`, ...`options`) => `T`

Defined in: [core/earth.ts:156](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L156)

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

***

### viewer

> `readonly` **viewer**: `Viewer`

Defined in: [core/earth.ts:21](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L21)

## Accessors

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/earth.ts:76](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L76)

##### Returns

`boolean`

***

### ready

#### Get Signature

> **get** **ready**(): `boolean`

Defined in: [core/earth.ts:72](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L72)

##### Returns

`boolean`

***

### sceneMode

#### Get Signature

> **get** **sceneMode**(): `SceneMode`

Defined in: [core/earth.ts:84](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L84)

Get or set the scene display mode

##### Default

```ts
SceneMode.SCENE3D
```

##### Returns

`SceneMode`

#### Set Signature

> **set** **sceneMode**(`mode`): `void`

Defined in: [core/earth.ts:88](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L88)

##### Parameters

###### mode

`SceneMode`

##### Returns

`void`

## Methods

### destroy()

> **destroy**(): `void`

Defined in: [core/earth.ts:167](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L167)

#### Returns

`void`

***

### off()

> **off**\<`T`\>(`event`, `fn?`): `any`

Defined in: [core/earth.ts:145](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L145)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md) = keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

##### fn?

[`EventFunc`](../dde-earth/namespaces/Earth/type-aliases/EventFunc.md)\<`T`\>

#### Returns

`any`

***

### on()

> **on**\<`T`\>(`event`, `fn`): `any`

Defined in: [core/earth.ts:136](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L136)

#### Type Parameters

##### T

`T` *extends* keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md) = keyof [`Events`](../dde-earth/namespaces/Earth/interfaces/Events.md)

#### Parameters

##### event

`T`

##### fn

[`EventFunc`](../dde-earth/namespaces/Earth/type-aliases/EventFunc.md)\<`T`\>

#### Returns

`any`

***

### resetStatus()

> **resetStatus**(): `void`

Defined in: [core/earth.ts:105](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L105)

#### Returns

`void`

***

### resetView()

> **resetView**(`viewPort`): `void`

Defined in: [core/earth.ts:121](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L121)

#### Parameters

##### viewPort

`number`[] = `...`

#### Returns

`void`
