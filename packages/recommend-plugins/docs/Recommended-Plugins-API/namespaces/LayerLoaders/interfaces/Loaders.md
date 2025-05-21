[**Recommended Plugins API**](../../../../README.md)

***

[Recommended Plugins API](../../../../README.md) / [LayerLoaders](../README.md) / Loaders

# Interface: Loaders

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:57](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L57)

## Properties

### arcgis()

> **arcgis**: (`earth`, `data`) => `Promise`\<`ArcGisLayerItem`\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:61](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L61)

#### Parameters

##### earth

`Earth`

##### data

`Data`

#### Returns

`Promise`\<`ArcGisLayerItem`\>

***

### tms()

> **tms**: (`earth`, `data`) => `Promise`\<[`TMSLayerItem`](../../../../classes/TMSLayerItem.md)\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:60](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L60)

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../../TMSLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<[`TMSLayerItem`](../../../../classes/TMSLayerItem.md)\>

***

### wms()

> **wms**: (`earth`, `data`) => `Promise`\<[`WMSLayerItem`](../../../../classes/WMSLayerItem.md)\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:58](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L58)

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../../WMSLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<[`WMSLayerItem`](../../../../classes/WMSLayerItem.md)\>

***

### wmts()

> **wmts**: (`earth`, `data`) => `Promise`\<[`WMTSLayerItem`](../../../../classes/WMTSLayerItem.md)\>

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:59](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L59)

#### Parameters

##### earth

`Earth`

##### data

[`Data`](../../WMTSLayerItem/type-aliases/Data.md)

#### Returns

`Promise`\<[`WMTSLayerItem`](../../../../classes/WMTSLayerItem.md)\>
