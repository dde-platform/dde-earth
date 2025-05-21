[**GeoJSON Loader Plugin API**](../../../../README.md)

***

[GeoJSON Loader Plugin API](../../../../README.md) / [GeoJsonLayerLoader](../README.md) / Loaders

# Interface: Loaders

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:41](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L41)

## Properties

### geojson()

> **geojson**: (`earth`, `data`) => `Promise`\<[`GeoJsonLayerItem`](../../../../classes/GeoJsonLayerItem.md)\>

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:42](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L42)

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../../GeoJsonLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<[`GeoJsonLayerItem`](../../../../classes/GeoJsonLayerItem.md)\>

***

### primitiveGeojson()

> **primitiveGeojson**: (`earth`, `data`) => `Promise`\<`PrimitiveGeojsonLayerItem`\>

Defined in: [plugin-geojson-loader/src/GeoJsonLayerLoader.ts:46](https://github.com/dde-platform/dde-earth/blob/ff77ffe84b4473f4eb30fc35d51c360b3969e53b/packages/plugin-geojson-loader/src/GeoJsonLayerLoader.ts#L46)

#### Parameters

##### earth

`Earth`

##### data

`Data`

#### Returns

`Promise`\<`PrimitiveGeojsonLayerItem`\>
