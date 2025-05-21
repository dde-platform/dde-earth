[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / NestedValueOf

# Type Alias: NestedValueOf\<ObjectType, Property\>

> **NestedValueOf**\<`ObjectType`, `Property`\> = `Property` *extends* `` `${infer Key}.${infer Rest}` `` ? `Key` *extends* keyof `ObjectType` ? `NestedValueOf`\<`ObjectType`\[`Key`\], `Rest`\> : `never` : `Property` *extends* keyof `ObjectType` ? `ObjectType`\[`Property`\] : `never`

Defined in: [utils/types.ts:19](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/utils/types.ts#L19)

## Type Parameters

### ObjectType

`ObjectType`

### Property

`Property` *extends* `string`
