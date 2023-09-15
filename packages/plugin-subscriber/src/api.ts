import { Subscriber } from '.';

declare module 'dde-earth' {
  export namespace EventEmitter {
    export interface Events
      extends Record<Subscriber.EventType, Subscriber.Args> {}
  }
}
