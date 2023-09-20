export type Tail<T extends any[]> = ((...args: T) => void) extends (
  head: any,
  ...tail: infer R
) => void
  ? R
  : never;
export type EventArgs = { [key: string]: any };

export type EventNames<M extends EventArgs> = Extract<keyof M, string>;

export type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType]:
        | `${Key & string}`
        | `${Key & string}.${NestedKeyOf<ObjectType[Key]>}`;
    }[keyof ObjectType]
  : never;

export type NestedValueOf<
  ObjectType,
  Property extends string,
> = Property extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? NestedValueOf<ObjectType[Key], Rest>
    : never
  : Property extends keyof ObjectType
  ? ObjectType[Property]
  : never;

export type NamespaceKeys<ObjectType, Keys extends string> = {
  [Property in Keys]: NestedValueOf<ObjectType, Property> extends string
    ? never
    : Property;
}[Keys];

export type MessageKeys<ObjectType, Keys extends string> = {
  [Property in Keys]: NestedValueOf<ObjectType, Property> extends string
    ? Property
    : never;
}[Keys];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
