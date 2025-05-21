[**Recommended Plugins API**](../../../../README.md)

***

[Recommended Plugins API](../../../../README.md) / [LayerLoaders](../README.md) / ExtractLoaderOptions

# Type Alias: ExtractLoaderOptions\<T\>

> **ExtractLoaderOptions**\<`T`\> = `{ [K in keyof T]?: T[K] extends LayerManager.Loader<infer U, any> ? U["renderOptions"] : never }`

Defined in: [recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts:67](https://github.com/dde-platform/dde-earth/blob/6072ab445eaffdb7776cf25b1239af6bc27166a4/packages/recommend-plugins/src/plugins/layerLoaders/LayerLoaders.ts#L67)

## Type Parameters

### T

`T` *extends* [`Loaders`](../interfaces/Loaders.md)
