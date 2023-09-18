import { Subscriber } from '.';

declare module 'dde-earth' {
  export namespace Earth {
    export interface Events
      extends Record<
        Subscriber.EventType,
        [movement: Subscriber.EventArgs, result?: any]
      > {}
  }
}
