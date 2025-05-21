[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / TerrainManager

# Class: TerrainManager

Defined in: [core/terrainManager.ts:5](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L5)

## Constructors

### Constructor

> **new TerrainManager**(`earth`, `options`): `TerrainManager`

Defined in: [core/terrainManager.ts:23](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L23)

#### Parameters

##### earth

[`Earth`](Earth.md)

##### options

[`Options`](../dde-earth/namespaces/TerrainManager/interfaces/Options.md) = `{}`

#### Returns

`TerrainManager`

## Properties

### earth

> `readonly` **earth**: [`Earth`](Earth.md)

Defined in: [core/terrainManager.ts:24](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L24)

## Accessors

### data

#### Get Signature

> **get** **data**(): `any`

Defined in: [core/terrainManager.ts:19](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L19)

##### Returns

`any`

***

### loaders

#### Get Signature

> **get** **loaders**(): `Record`\<`string`, [`Loader`](../dde-earth/namespaces/TerrainManager/type-aliases/Loader.md)\<`any`, `any`\>\>

Defined in: [core/terrainManager.ts:15](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L15)

##### Returns

`Record`\<`string`, [`Loader`](../dde-earth/namespaces/TerrainManager/type-aliases/Loader.md)\<`any`, `any`\>\>

***

### terrain

#### Get Signature

> **get** **terrain**(): `TerrainProvider`

Defined in: [core/terrainManager.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L11)

##### Returns

`TerrainProvider`

## Methods

### addLoader()

> **addLoader**(`loaders`): `void`

Defined in: [core/terrainManager.ts:31](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L31)

#### Parameters

##### loaders

`Record`\<`string`, [`Loader`](../dde-earth/namespaces/TerrainManager/type-aliases/Loader.md)\<`any`, `any`\>\>

#### Returns

`void`

***

### getLoaderByMethod()

> **getLoaderByMethod**(`method`): [`Loader`](../dde-earth/namespaces/TerrainManager/type-aliases/Loader.md)\<`any`, `any`\>

Defined in: [core/terrainManager.ts:47](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L47)

#### Parameters

##### method

`string`

#### Returns

[`Loader`](../dde-earth/namespaces/TerrainManager/type-aliases/Loader.md)\<`any`, `any`\>

***

### removeLoader()

> **removeLoader**(`method`): `void`

Defined in: [core/terrainManager.ts:38](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L38)

#### Parameters

##### method

`string` | `string`[]

#### Returns

`void`

***

### setTerrain()

> **setTerrain**\<`Method`\>(`data?`): `Promise`\<`undefined` \| `EllipsoidTerrainProvider` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"instance"`\]\>\>

Defined in: [core/terrainManager.ts:51](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/terrainManager.ts#L51)

#### Type Parameters

##### Method

`Method` *extends* `"cesium"`

#### Parameters

##### data?

`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"data"`\]

#### Returns

`Promise`\<`undefined` \| `EllipsoidTerrainProvider` \| `Awaited`\<`ExtractLoaderTypes`\<[`Loaders`](../dde-earth/namespaces/TerrainManager/interfaces/Loaders.md)\>\[`Method`\]\[`"instance"`\]\>\>
