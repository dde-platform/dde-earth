[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / LayerManager

# Class: LayerManager

Defined in: [core/layerManager.ts:10](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L10)

## Constructors

### Constructor

> **new LayerManager**(`earth`, `options`): `LayerManager`

Defined in: [core/layerManager.ts:45](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L45)

#### Parameters

##### earth

[`Earth`](Earth.md)

##### options

[`Options`](../dde-earth/namespaces/LayerManager/interfaces/Options.md) = `{}`

#### Returns

`LayerManager`

## Properties

### earth

> `readonly` **earth**: [`Earth`](Earth.md)

Defined in: [core/layerManager.ts:46](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L46)

***

### viewer

> `readonly` **viewer**: `Viewer`

Defined in: [core/layerManager.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L15)

## Accessors

### baseLayer

#### Get Signature

> **get** **baseLayer**(): `undefined` \| `ImageryLayer`

Defined in: [core/layerManager.ts:21](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L21)

##### Returns

`undefined` \| `ImageryLayer`

#### Set Signature

> **set** **baseLayer**(`layer`): `void`

Defined in: [core/layerManager.ts:34](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L34)

##### Parameters

###### layer

`undefined` | `ImageryLayer`

##### Returns

`void`

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

Defined in: [core/layerManager.ts:17](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L17)

##### Returns

`boolean`

***

### layerList

#### Get Signature

> **get** **layerList**(): [`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>[]

Defined in: [core/layerManager.ts:25](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L25)

##### Returns

[`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>[]

***

### loaders

#### Get Signature

> **get** **loaders**(): `Record`\<`string`, [`Loader`](../dde-earth/namespaces/LayerManager/type-aliases/Loader.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>\>

Defined in: [core/layerManager.ts:30](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L30)

##### Returns

`Record`\<`string`, [`Loader`](../dde-earth/namespaces/LayerManager/type-aliases/Loader.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>\>

## Methods

### addLayer()

> **addLayer**\<`Method`\>(`data`, `options?`): `Promise`\<`undefined` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/LayerManager/interfaces/Loaders.md)\>\[`Method`\]\[`"layerItem"`\]\>\>

Defined in: [core/layerManager.ts:112](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L112)

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

### addLoader()

> **addLoader**(`loaders`): `void`

Defined in: [core/layerManager.ts:60](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L60)

#### Parameters

##### loaders

`Record`\<`string`, [`Loader`](../dde-earth/namespaces/LayerManager/type-aliases/Loader.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>\>

#### Returns

`void`

***

### changeBaseLayer()

> **changeBaseLayer**\<`Method`\>(`data`): `Promise`\<`void`\>

Defined in: [core/layerManager.ts:80](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L80)

#### Type Parameters

##### Method

`Method` *extends* `never`

#### Parameters

##### data

`undefined` | `null` | `ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/LayerManager/interfaces/Loaders.md)\>\[`Method`\]\[`"data"`\]

#### Returns

`Promise`\<`void`\>

***

### destroy()

> **destroy**(): `void`

Defined in: [core/layerManager.ts:171](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L171)

#### Returns

`void`

***

### getLayerById()

> **getLayerById**(`id`): `undefined` \| [`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

Defined in: [core/layerManager.ts:167](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L167)

#### Parameters

##### id

`string`

#### Returns

`undefined` \| [`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

***

### getLoaderByMethod()

> **getLoaderByMethod**(`method`): [`Loader`](../dde-earth/namespaces/LayerManager/type-aliases/Loader.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

Defined in: [core/layerManager.ts:76](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L76)

#### Parameters

##### method

`string`

#### Returns

[`Loader`](../dde-earth/namespaces/LayerManager/type-aliases/Loader.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

***

### removeLayer()

> **removeLayer**(`param`): `Promise`\<`boolean`\>

Defined in: [core/layerManager.ts:147](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L147)

remove layer from the layer list

#### Parameters

##### param

layerName or LayerItem object

`string` | [`LayerItem`](LayerItem.md)\<[`BaseLayer`](../dde-earth/namespaces/LayerManager/interfaces/BaseLayer.md)\<`string`, `any`\>, `any`\>

#### Returns

`Promise`\<`boolean`\>

removed successfully or not

***

### removeLoader()

> **removeLoader**(`method`): `void`

Defined in: [core/layerManager.ts:67](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L67)

#### Parameters

##### method

`string` | `string`[]

#### Returns

`void`
