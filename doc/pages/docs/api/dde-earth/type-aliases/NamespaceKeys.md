[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / NamespaceKeys

# Type Alias: NamespaceKeys\<ObjectType, Keys\>

> **NamespaceKeys**\<`ObjectType`, `Keys`\> = `{ [Property in Keys]: NestedValueOf<ObjectType, Property> extends string ? never : Property }`\[`Keys`\]

Defined in: [utils/types.ts:30](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/utils/types.ts#L30)

## Type Parameters

### ObjectType

`ObjectType`

### Keys

`Keys` *extends* `string`
