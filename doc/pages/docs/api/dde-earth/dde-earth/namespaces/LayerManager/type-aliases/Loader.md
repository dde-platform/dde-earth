[**dde-earth**](../../../../README.md)

***

[dde-earth](../../../../globals.md) / [LayerManager](../README.md) / Loader

# Type Alias: Loader()\<T, Instance\>

> **Loader**\<`T`, `Instance`\> = (`earth`, `data`) => [`LayerItem`](../../../../classes/LayerItem.md)\<`T`, `Instance`\> \| `Promise`\<[`LayerItem`](../../../../classes/LayerItem.md)\<`T`, `Instance`\>\>

Defined in: [core/layerManager.ts:198](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/layerManager.ts#L198)

## Type Parameters

### T

`T` *extends* [`BaseLayer`](../interfaces/BaseLayer.md) = [`BaseLayer`](../interfaces/BaseLayer.md)

### Instance

`Instance` = `any`

## Parameters

### earth

[`Earth`](../../../../classes/Earth.md)

### data

`T`

## Returns

[`LayerItem`](../../../../classes/LayerItem.md)\<`T`, `Instance`\> \| `Promise`\<[`LayerItem`](../../../../classes/LayerItem.md)\<`T`, `Instance`\>\>
