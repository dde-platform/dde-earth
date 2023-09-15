export type Tail<T extends any[]> = ((...args: T) => void) extends (
  head: any,
  ...tail: infer R
) => void
  ? R
  : never;
export type EventArgs = { [key: string]: any };

export type EventNames<M extends EventArgs> = Extract<keyof M, string>;
