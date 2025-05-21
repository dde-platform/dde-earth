[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / NestedKeyOf

# Type Alias: NestedKeyOf\<ObjectType\>

> **NestedKeyOf**\<`ObjectType`\> = `ObjectType` *extends* `object` ? \{ \[Key in keyof ObjectType\]: \`$\{Key & string\}\` \| \`$\{Key & string\}.$\{NestedKeyOf\<ObjectType\[Key\]\>\}\` \}\[keyof `ObjectType`\] : `never`

Defined in: [utils/types.ts:11](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/utils/types.ts#L11)

## Type Parameters

### ObjectType

`ObjectType`
