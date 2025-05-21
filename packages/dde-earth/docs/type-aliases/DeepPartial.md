[**dde-earth**](../README.md)

***

[dde-earth](../globals.md) / DeepPartial

# Type Alias: DeepPartial\<T\>

> **DeepPartial**\<`T`\> = `{ [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] }`

Defined in: [utils/types.ts:68](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/utils/types.ts#L68)

## Type Parameters

### T

`T`
