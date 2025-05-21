[**dde-earth**](../../../../README.md)

***

[dde-earth](../../../../globals.md) / [Earth](../README.md) / EarthOptions

# Type Alias: EarthOptions

> **EarthOptions** = `object` & `Viewer.ConstructorOptions`

Defined in: [core/earth.ts:176](https://github.com/dde-platform/dde-earth/blob/71bf8cd183d78890e103803e0d8bb92050729fda/packages/dde-earth/src/core/earth.ts#L176)

## Type declaration

### backgroundColor?

> `optional` **backgroundColor**: `string`

scene background color
@default'#00000099'

### baseColor?

> `optional` **baseColor**: `string`

globe base color
@default'#4F4F4F'

### defaultViewPort?

> `optional` **defaultViewPort**: `number`[]

default viewport
@default[116.3, 39.9, 20000000]

### plugins?

> `optional` **plugins**: [`IPlugin`](../../../../type-aliases/IPlugin.md)[]

plugins list

### toolOptions?

> `optional` **toolOptions**: `object`

#### toolOptions.i18n?

> `optional` **i18n**: `Partial`\<[`Options`](../../I18N/interfaces/Options.md)\>
