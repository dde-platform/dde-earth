[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / MessageKeys

# Type Alias: MessageKeys\<ObjectType, Keys\>

> **MessageKeys**\<`ObjectType`, `Keys`\> = `{ [Property in Keys]: NestedValueOf<ObjectType, Property> extends string ? Property : never }`\[`Keys`\]

Defined in: [utils/types.ts:36](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/utils/types.ts#L36)

## Type Parameters

### ObjectType

`ObjectType`

### Keys

`Keys` *extends* `string`
